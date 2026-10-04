import './component.css';

const defaults = [
  { title: 'A calmer way to plan', description: 'Bring the work, decisions, and people into one clear view.', icon: '01' },
  { title: 'Room for the details', description: 'Keep thoughtful notes beside the milestones they inform.', icon: '02' },
  { title: 'Momentum, made visible', description: 'See what moved forward and where the next conversation belongs.', icon: '03' },
];
export function FeatureGrid({ features = defaults, eyebrow = 'MADE FOR THE WORK', title = 'Good work has a rhythm.', columns = 3 }) {
  return <section className="cc-features"><header><span>{eyebrow}</span><h2>{title}</h2></header><div className="cc-features__grid" style={{ '--cc-feature-columns': Math.max(1, Math.min(4, columns)) }}>{features.map((feature, index) => <article className="cc-features__item" key={feature.title || index}>
    <div className="cc-features__icon">{feature.icon ?? String(index + 1).padStart(2, '0')}</div><h3>{feature.title}</h3><p>{feature.description}</p>{feature.href && <a href={feature.href}>{feature.linkLabel || 'Explore feature'} <span aria-hidden="true">→</span></a>}
  </article>)}</div></section>;
}