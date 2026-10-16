import { useState } from 'react';
import './component.css';

const initialItems = [
  { id: 'n1', title: 'Avery mentioned you', detail: '“Could you check the final layout?”', time: '8m', unread: true, kind: 'mention' },
  { id: 'n2', title: 'Review is ready', detail: 'Atlas rebrand · Round 03', time: '1h', unread: true, kind: 'review' },
  { id: 'n3', title: 'Weekly digest', detail: 'Your team closed 6 tasks this week.', time: 'Yesterday', unread: false, kind: 'digest' },
];
export function NotificationCenter({ notifications = initialItems, onRead, onMarkAllRead, title = 'Inbox' }) {
  const [items, setItems] = useState(notifications);
  const [filter, setFilter] = useState('all');
  const visible = items.filter((item) => filter === 'all' || (filter === 'unread' ? item.unread : !item.unread));
  const markRead = (item) => { setItems((current) => current.map((entry) => entry.id === item.id ? { ...entry, unread: false } : entry)); onRead?.(item); };
  const markAll = () => { setItems((current) => current.map((item) => ({ ...item, unread: false }))); onMarkAllRead?.(); };
  return <section className="cc-notices" aria-label={title}>
    <header className="cc-notices__head"><div><span>UPDATES</span><h2>{title}<b>{items.filter((item) => item.unread).length}</b></h2></div><button type="button" onClick={markAll} disabled={!items.some((item) => item.unread)}>Mark all read</button></header>
    <div className="cc-notices__filters" role="group" aria-label="Filter notifications">{['all', 'unread', 'read'].map((value) => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{value[0].toUpperCase() + value.slice(1)}</button>)}</div>
    {visible.length ? <ul>{visible.map((item) => <li key={item.id} className={item.unread ? 'is-unread' : ''}><span className={`cc-notices__symbol cc-notices__symbol--${item.kind || 'default'}`} aria-hidden="true">{item.kind === 'mention' ? '@' : item.kind === 'review' ? '✓' : '•'}</span><div className="cc-notices__copy"><strong>{item.title}</strong><p>{item.detail}</p><time>{item.time}</time></div>{item.unread && <button className="cc-notices__read" type="button" onClick={() => markRead(item)} aria-label={`Mark ${item.title} as read`} title="Mark as read" />}</li>)}</ul> : <p className="cc-notices__empty">All caught up. Nothing in this view.</p>}
  </section>;
}