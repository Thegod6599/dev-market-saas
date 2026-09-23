export function ProductHero({ eyebrow, title, description, action }) {
  return <section><span>{eyebrow}</span><h1>{title}</h1><p>{description}</p><a href={action.href}>{action.label}</a></section>;
}