import { useCallback, useEffect, useId, useRef, useState } from 'react';
import './component.css';

export function ModalDialog({ open: controlledOpen, defaultOpen = false, onOpenChange, title = 'Archive this draft?', description = 'This draft will leave your active workspace. You can restore it later from the archive.', confirmLabel = 'Archive draft', onConfirm }) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const titleId = useId();
  const descId = useId();
  const cancelRef = useRef(null);
  const dialogRef = useRef(null);
  const setOpen = useCallback((value) => {
    if (controlledOpen === undefined) setInternalOpen(value);
    onOpenChange?.(value);
  }, [controlledOpen, onOpenChange]);
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const frame = requestAnimationFrame(() => cancelRef.current?.focus());
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll('button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])') ?? [],
      );
      if (!focusable.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { cancelAnimationFrame(frame); document.removeEventListener('keydown', onKey); previous?.focus?.(); };
  }, [open, setOpen]);
  return <div className="cc-modal">
    <button type="button" className="cc-modal__launch" data-testid="button-open-dialog" onClick={() => setOpen(true)}>Open confirmation</button>
    {open && <div className="cc-modal__scrim" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section ref={dialogRef} className="cc-modal__dialog" role="alertdialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descId} data-testid="dialog-confirmation">
        <div className="cc-modal__icon" aria-hidden="true">!</div><p className="cc-modal__eyebrow">PLEASE CONFIRM</p><h2 id={titleId}>{title}</h2><p id={descId} className="cc-modal__description">{description}</p>
        <div className="cc-modal__actions"><button ref={cancelRef} type="button" className="cc-modal__cancel" data-testid="button-cancel-dialog" onClick={() => setOpen(false)}>Keep draft</button><button type="button" className="cc-modal__confirm" data-testid="button-confirm-dialog" onClick={() => { onConfirm?.(); setOpen(false); }}>{confirmLabel}</button></div>
      </section>
    </div>}
  </div>;
}