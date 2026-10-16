import { useId, useState } from 'react';
import './component.css';

const initialTabs = [
  { id: 'overview', label: 'Overview', eyebrow: 'IN A GLANCE', content: 'A focused summary of what changed, what needs attention, and where the work is headed.' },
  { id: 'activity', label: 'Activity', eyebrow: 'LATEST UPDATES', content: 'Mara shared a review note · 18 minutes ago. The latest revision is ready for your eyes.' },
  { id: 'files', label: 'Files', eyebrow: 'ATTACHED MATERIAL', content: '4 project files are ready to browse, including the latest field notes and approved artwork.' },
];
export function TabsPanel({ tabs = initialTabs, activeTab, defaultActiveTab, onChange, title = 'Project room' }) {
  const uid = useId();
  const [internal, setInternal] = useState(defaultActiveTab ?? tabs[0]?.id);
  const active = activeTab ?? internal;
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0];
  const select = (id) => { if (activeTab === undefined) setInternal(id); onChange?.(id); };
  const keydown = (event, index) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else return;
    event.preventDefault();
    select(tabs[next].id);
    document.getElementById(`${uid}-tab-${tabs[next].id}`)?.focus();
  };
  return <section className="cc-tabs" aria-label={title} data-testid="panel-tabs">
    <header className="cc-tabs__head"><span className="cc-tabs__kicker">FIELDNOTES / 08</span><h2>{title}</h2></header>
    <div className="cc-tabs__list" role="tablist" aria-label={`${title} sections`}>{tabs.map((tab, index) => <button id={`${uid}-tab-${tab.id}`} key={tab.id} type="button" role="tab" aria-selected={active === tab.id} aria-controls={`${uid}-panel`} tabIndex={active === tab.id ? 0 : -1} data-testid={`tab-${tab.id}`} onClick={() => select(tab.id)} onKeyDown={(event) => keydown(event, index)}>{tab.label}<span>{String(index + 1).padStart(2, '0')}</span></button>)}</div>
    <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${current?.id}`} className="cc-tabs__body" data-testid="content-active-tab"><p className="cc-tabs__eyebrow">{current?.eyebrow}</p><h3>{current?.label}</h3><p>{current?.content}</p></div>
    <footer className="cc-tabs__foot"><span>Updated just now</span><span aria-hidden="true">↗</span></footer>
  </section>;
}