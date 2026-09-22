export function SimpleFooter({ brand, links = [] }) {
  return <footer><strong>{brand}</strong>{links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}</footer>;
}