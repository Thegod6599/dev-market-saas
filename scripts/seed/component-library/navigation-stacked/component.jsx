import './component.css';

export function StackedNavigation({ title = "Product", items = [], activeHref }) {
  return (
    <header className="cc-stacked-navigation">
      <h2>{title}</h2>
      <nav aria-label={`${title} navigation`}>{items.map((item) => <a href={item.href} key={item.href} aria-current={activeHref === item.href ? 'page' : undefined}>{item.label}</a>)}</nav>
    </header>
  );
}
