import { useEffect, useRef, useState } from 'react';
import './component.css';

const defaultItems = [
  { id: 'note', label: 'New note', mark: '＋' },
  { id: 'upload', label: 'Upload file', mark: '↑' },
  { id: 'invite', label: 'Invite people', mark: '↗' },
];

export function FloatingActionMenu({ items = defaultItems, onSelect, label = 'Quick actions', defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const rootRef = useRef(null);
  useEffect(() => {
    const keydown = (event) => { if (event.key === 'Escape') setOpen(false); };
    const outside = (event) => { if (!rootRef.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('keydown', keydown);
    document.addEventListener('pointerdown', outside);
    return () => { document.removeEventListener('keydown', keydown); document.removeEventListener('pointerdown', outside); };
  }, []);
  return <div className={`cc-fab ${open ? 'is-open' : ''}`} ref={rootRef} data-testid="menu-floating-actions">
    {open && <div className="cc-fab__items" role="menu" aria-label={label}>{items.map((item, index) => <button key={item.id} type="button" role="menuitem" className="cc-fab__item" style={{ '--item-index': index }} data-testid={`button-quick-${item.id}`} onClick={() => { onSelect?.(item); setOpen(false); }}><span className="cc-fab__item-mark" aria-hidden="true">{item.mark ?? '→'}</span><span>{item.label}</span></button>)}</div>}
    <button type="button" className="cc-fab__trigger" aria-label={open ? 'Close quick actions' : label} aria-expanded={open} aria-haspopup="menu" data-testid="button-toggle-quick-actions" onClick={() => setOpen((value) => !value)}><span aria-hidden="true">{open ? '×' : '+'}</span></button>
  </div>;
}