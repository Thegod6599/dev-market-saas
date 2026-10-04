import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import './component.css';

const defaultCommands = [
  { label: 'Create a new project', group: 'Create' },
  { label: 'Open settings', group: 'Workspace' },
  { label: 'Invite a teammate', group: 'People' },
];

export function CommandPalette({
  commands = defaultCommands,
  onSelect,
  placeholder = 'Search commands…',
  open: controlledOpen,
  onOpenChange,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const dialogId = useId();
  const isOpen = controlledOpen ?? internalOpen;

  const setOpen = useCallback((value) => {
    if (controlledOpen === undefined) setInternalOpen(value);
    onOpenChange?.(value);
  }, [controlledOpen, onOpenChange]);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return commands.filter((item) =>
      `${item.label} ${item.group || ''}`.toLowerCase().includes(search),
    );
  }, [commands, query]);

  useEffect(() => {
    if (!isOpen) return;
    setQuery('');
    setActive(0);
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    const handle = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(!isOpen);
        return;
      }
      if (!isOpen) return;
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActive((value) => (filtered.length ? (value + 1) % filtered.length : 0));
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActive((value) => (filtered.length ? (value - 1 + filtered.length) % filtered.length : 0));
      }
      if (event.key === 'Enter' && filtered[active]) {
        event.preventDefault();
        onSelect?.(filtered[active]);
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [active, filtered, isOpen, onSelect, setOpen]);

  return (
    <div className="cc-command">
      <button
        type="button"
        className="cc-command__trigger"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={dialogId}
        onClick={() => setOpen(true)}
      >
        <span className="cc-command__trigger-icon" aria-hidden="true">⌕</span>
        <span>Search actions</span>
        <kbd>⌘ K</kbd>
      </button>
      {isOpen && (
        <div
          className="cc-command__scrim"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <section
            id={dialogId}
            className="cc-command__dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <button
              type="button"
              className="cc-command__close"
              onClick={() => setOpen(false)}
              aria-label="Close command palette"
            >
              ×
            </button>
            <label className="cc-command__search">
              <span aria-hidden="true">⌕</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                placeholder={placeholder}
                aria-label="Search commands"
              />
            </label>
            {filtered.length ? (
              <ul aria-label="Commands">
                {filtered.map((item, index) => (
                  <li key={`${item.label}-${index}`}>
                    <button
                      type="button"
                      className={index === active ? 'is-active' : ''}
                      onFocus={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => {
                        onSelect?.(item);
                        setOpen(false);
                      }}
                    >
                      <span>{item.label}</span>
                      <small>{item.group || 'Command'}</small>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="cc-command__empty">No matching commands. Try another search.</p>
            )}
            <footer>
              <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
              <span><kbd>↵</kbd> to select <kbd>esc</kbd> to close</span>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}