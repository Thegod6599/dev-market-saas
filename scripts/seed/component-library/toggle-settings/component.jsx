import { useState } from 'react';
import './component.css';

const defaults = [
  { id: 'digest', title: 'Weekly digest', description: 'A short Friday recap of the work that moved.', enabled: true },
  { id: 'mentions', title: 'Direct mentions', description: 'Let me know when someone needs my eyes.', enabled: true },
  { id: 'product', title: 'Product notes', description: 'Occasional notes about new tools and changes.', enabled: false },
];
export function ToggleSettings({ settings = defaults, values, onChange, title = 'A quieter inbox' }) {
  const [local, setLocal] = useState(() => Object.fromEntries(settings.map((setting) => [setting.id, setting.enabled])));
  const current = values ?? local;
  const change = (id, enabled) => { if (values === undefined) setLocal((value) => ({ ...value, [id]: enabled })); onChange?.(id, enabled); };
  return <section className="cc-settings" aria-labelledby="cc-settings-title" data-testid="panel-toggle-settings">
    <header><span className="cc-settings__mark" aria-hidden="true">◎</span><div><p>NOTIFICATIONS / PREFERENCES</p><h2 id="cc-settings-title">{title}</h2></div></header>
    <div className="cc-settings__rows">{settings.map((setting) => <div className="cc-settings__row" key={setting.id}><div className="cc-settings__copy"><h3>{setting.title}</h3><p>{setting.description}</p></div><button type="button" role="switch" aria-checked={Boolean(current[setting.id])} aria-label={setting.title} data-testid={`switch-${setting.id}`} className={`cc-settings__switch ${current[setting.id] ? 'is-on' : ''}`} onClick={() => change(setting.id, !current[setting.id])}><span></span></button></div>)}</div>
    <footer><span>Changes are saved automatically</span><span className="cc-settings__live" aria-live="polite">{Object.values(current).filter(Boolean).length} enabled</span></footer>
  </section>;
}