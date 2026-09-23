export function SplitHero({ title, description, visual }) {
  return <section><div><h1>{title}</h1><p>{description}</p></div><div>{visual}</div></section>;
}