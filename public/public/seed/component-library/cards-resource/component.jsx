export function ResourceCard({ title, description, href }) {
  return <article><h3>{title}</h3><p>{description}</p><a href={href}>Read more</a></article>;
}