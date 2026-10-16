import './component.css';

export function ColumnFooter({ columns = [], brand = 'Northstar', copyright = '© 2026 Northstar. All rights reserved.' }) {
  return <footer className="cc-column-footer"><div className="cc-column-footer__brand"><strong>{brand}</strong><p>Thoughtful tools for ambitious teams.</p></div><div className="cc-column-footer__columns">{columns.map((column) => <section key={column.title}><h3>{column.title}</h3>{column.links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}</section>)}</div><small>{copyright}</small></footer>;
}
