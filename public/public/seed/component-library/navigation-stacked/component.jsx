export function StackedNavigation({ title = "Product", items = [] }) {
  return (
    <header>
      <h2>{title}</h2>
      <nav>{items.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</nav>
    </header>
  );
}