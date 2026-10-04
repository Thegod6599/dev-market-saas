import './component.css';

const defaults = [
  { label: 'Active projects', value: '18', delta: '+3', detail: 'since last month', trend: 'up' },
  { label: 'Hours returned', value: '126.5', delta: '+12.8%', detail: 'team-wide', trend: 'up' },
  { label: 'Awaiting review', value: '07', detail: '2 due today', trend: 'neutral' },
];
export function MetricStrip({ metrics = defaults, title = 'Workspace pulse' }) {
  return <section className="cc-metrics" aria-label={title}><header><span>{title}</span><span className="cc-metrics__period">LAST 30 DAYS</span></header><div className="cc-metrics__row">{metrics.map((metric, index) => <article key={`${metric.label}-${index}`}><span className="cc-metrics__label">{metric.label}</span><div className="cc-metrics__value">{metric.value}</div><p>{metric.delta && <b className={`cc-metrics__delta cc-metrics__delta--${metric.trend || 'up'}`}>{metric.delta}</b>}{metric.detail && <span>{metric.detail}</span>}</p></article>)}</div></section>;
}