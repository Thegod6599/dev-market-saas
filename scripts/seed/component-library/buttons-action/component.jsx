import './component.css';
const variants = new Set(['primary', 'secondary', 'quiet']);
export function ActionButton({ children, variant = 'primary', className = '', type = 'button', ...props }) {
  const safeVariant = variants.has(variant) ? variant : 'primary';
  return <button className={['action-button', 'action-button--' + safeVariant, className].filter(Boolean).join(' ')} type={type} {...props}>{children}</button>;
}