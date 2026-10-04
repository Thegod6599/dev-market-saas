import { useState } from 'react';
import './component.css';

const defaultGroups = [
  { label: 'Workspace', items: [{ label: 'Overview', href: '#overview' }, { label: 'Projects', href: '#projects' }, { label: 'People', href: '#people' }] },
  { label: 'Manage', items: [{ label: 'Reports', href: '#reports' }, { label: 'Settings', href: '#settings' }] },
];

export function WorkspaceSidebar({ groups = defaultGroups, activeHref = '#overview', collapsed: initialCollapsed = false, onNavigate, title = 'Studio North' }) {
  const [collapsed, setCollapsed] = useState(initialCollapsed);
  const [openGroups, setOpenGroups] = useState(() => Object.fromEntries(groups.map((group) => [group.label, true])));
  return <aside className={`cc-workspace ${collapsed ? 'is-collapsed' : ''}`}>
    <header className="cc-workspace__head"><span className="cc-workspace__mark" aria-hidden="true">S</span>{!collapsed && <strong>{title}</strong>}<button type="button" className="cc-workspace__collapse" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-expanded={!collapsed}>{collapsed ? '›' : '‹'}</button></header>
    <nav aria-label="Workspace navigation">{groups.map((group) => <section className="cc-workspace__group" key={group.label}>
      {!collapsed && <button className="cc-workspace__group-title" type="button" aria-expanded={!!openGroups[group.label]} onClick={() => setOpenGroups({ ...openGroups, [group.label]: !openGroups[group.label] })}>{group.label}<span aria-hidden="true">{openGroups[group.label] ? '−' : '+'}</span></button>}
      {(collapsed || openGroups[group.label]) && <ul>{group.items.map((item) => <li key={item.href}><a href={item.href} title={collapsed ? item.label : undefined} aria-current={activeHref === item.href ? 'page' : undefined} onClick={() => onNavigate?.(item)}><span className="cc-workspace__dot" aria-hidden="true">{item.label.slice(0, 1)}</span>{!collapsed && item.label}</a></li>)}</ul>}
    </section>)}</nav>
    {!collapsed && <footer className="cc-workspace__foot"><span className="cc-workspace__avatar" aria-hidden="true">AM</span><span><b>Alex Morgan</b><small>Personal workspace</small></span></footer>}
  </aside>;
}