import './component.css';

export function ResourceCard({ title, description, href, linkLabel = 'Read more', category }) {
  return <article className="cc-resource-card">{category ? <span className="cc-resource-card__category">{category}</span> : null}<h3>{title}</h3><p>{description}</p><a href={href}>{linkLabel}<span aria-hidden="true"> ↗</span></a></article>;
}
