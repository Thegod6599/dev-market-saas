export function IconButton({ label, children, ...props }) {
  return <button type="button" aria-label={label} {...props}>{children}</button>;
}