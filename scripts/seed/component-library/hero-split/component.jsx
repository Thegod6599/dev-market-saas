import './component.css';

export function SplitHero({ eyebrow, title, description, visual, action }) {
  return <section className="cc-split-hero"><div className="cc-split-hero__copy">{eyebrow ? <span>{eyebrow}</span> : null}<h1>{title}</h1><p>{description}</p>{action ? <a href={action.href}>{action.label} →</a> : null}</div><div className="cc-split-hero__visual">{visual}</div></section>;
}
