import './component.css';

export function BreadcrumbTrail({ items = [{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: 'Design system' }], className = '' }) {
  return (
    <nav className={`cc-breadcrumbs ${className}`} aria-label="Breadcrumb">
      <ol>{items.map((item, index) => {
        const current = index === items.length - 1;
        return <li key={`${item.label}-${index}`}>
          {index > 0 && <span className="cc-breadcrumbs__separator" aria-hidden="true">/</span>}
          {current || !item.href
            ? <span aria-current={current ? 'page' : undefined}>{item.label}</span>
            : <a href={item.href}>{item.label}</a>}
        </li>;
      })}</ol>
    </nav>
  );
}