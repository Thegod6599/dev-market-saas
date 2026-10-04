import './component.css';

export function SimpleFooter({ brand = 'Northstar', links = [], copyright = '© 2026 Northstar' }) {
  return <footer className="cc-simple-footer"><strong>{brand}</strong><nav aria-label="Footer navigation">{links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}</nav><small>{copyright}</small></footer>;
}
