import './component.css';

const defaults = [
  { name: 'Northstar', mark: 'N', style: 'northstar' },
  { name: 'Morrow', mark: 'morrow', style: 'morrow' },
  { name: 'Atelier One', mark: 'A1', style: 'atelier' },
  { name: 'Common Ground', mark: '◒', style: 'common' },
  { name: 'Rook & Row', mark: 'R', style: 'rook' },
  { name: 'Forma', mark: 'forma', style: 'forma' },
];
export function LogoCloud({ logos = defaults, label = 'Selected collaborators' }) {
  return <section className="cc-logos" aria-label={label} data-testid="section-logo-cloud">
    <div className="cc-logos__intro"><span>GOOD COMPANY</span><p>Independent teams, building what comes next.</p></div>
    <ul>{logos.map((logo) => <li key={logo.name} data-testid={`logo-${logo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}><span className={`cc-logos__mark cc-logos__mark--${logo.style ?? 'custom'}`} aria-hidden="true">{logo.mark}</span><span className="cc-logos__name">{logo.name}</span></li>)}</ul>
    <footer><span>01 — 06</span><span className="cc-logos__rule"></span><span>TRUSTED IN GOOD COMPANY</span></footer>
  </section>;
}