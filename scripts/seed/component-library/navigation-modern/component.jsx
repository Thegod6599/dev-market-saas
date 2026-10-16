import './component.css';

export function ModernNavbar({ brand = "Northstar", links = [], action }) {
  return (
    <nav className="cc-modern-navbar" aria-label="Primary navigation">
      <strong className="cc-modern-navbar__brand">{brand}</strong>
      <div className="cc-modern-navbar__links">
        {links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
      </div>
      {action ? <a className="cc-modern-navbar__action" href={action.href}>{action.label}</a> : null}
    </nav>
  );
}
