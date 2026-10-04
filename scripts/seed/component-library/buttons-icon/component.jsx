import './component.css';

export function IconButton({ label, children, ...props }) {
  return <button type="button" className={['cc-icon-button', props.className].filter(Boolean).join(' ')} aria-label={label} {...props}>{children}</button>;
}
