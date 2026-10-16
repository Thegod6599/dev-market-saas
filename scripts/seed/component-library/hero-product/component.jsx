import './component.css';

export function ProductHero({ eyebrow, title, description, action = { href: '#start', label: 'Get started' } }) {
  return <section className="cc-product-hero">{eyebrow ? <span className="cc-product-hero__eyebrow">{eyebrow}</span> : null}<h1>{title}</h1><p>{description}</p>{action ? <a href={action.href}>{action.label}<span aria-hidden="true"> →</span></a> : null}</section>;
}
