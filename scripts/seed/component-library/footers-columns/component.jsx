export function ColumnFooter({ columns = [] }) {
  return <footer>{columns.map((column) => <section key={column.title}><h3>{column.title}</h3>{column.links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}</section>)}</footer>;
}