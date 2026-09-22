export function ModernNavbar({ brand = "DevMarket", links = [] }) {
  return (
    <nav aria-label="Primary navigation">
      <strong>{brand}</strong>
      <div>
        {links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}
      </div>
    </nav>
  );
}