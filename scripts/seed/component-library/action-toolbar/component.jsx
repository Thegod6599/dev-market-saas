import { useState } from 'react';
import './component.css';

const defaults = [
  { id: 'bold', label: 'Bold', mark: 'B' },
  { id: 'italic', label: 'Italic', mark: 'I' },
  { id: 'underline', label: 'Underline', mark: 'U' },
];

export function ActionToolbar({ actions = defaults, selected, defaultSelected = [], onAction, label = 'Text formatting' }) {
  const [internal, setInternal] = useState(defaultSelected);
  const active = selected ?? internal;
  const toggle = (action) => {
    const next = active.includes(action.id) ? active.filter((id) => id !== action.id) : [...active, action.id];
    if (selected === undefined) setInternal(next);
    onAction?.(action, next);
  };
  return <div className="cc-toolbar" role="toolbar" aria-label={label} data-testid="toolbar-actions">
    <span className="cc-toolbar__caption">FORMAT</span>
    <div className="cc-toolbar__group">{actions.map((action) => <button key={action.id} type="button" aria-label={action.label} aria-pressed={active.includes(action.id)} data-testid={`button-action-${action.id}`} className={active.includes(action.id) ? 'is-active' : ''} onClick={() => toggle(action)}>
      <span className={`cc-toolbar__mark cc-toolbar__mark--${action.id}`} aria-hidden="true">{action.mark ?? action.label.slice(0, 1)}</span><span className="cc-toolbar__label">{action.label}</span>
    </button>)}</div>
    <span className="cc-toolbar__hint" aria-live="polite" data-testid="text-toolbar-selection">{active.length ? `${active.length} active` : 'Choose a style'}</span>
  </div>;
}