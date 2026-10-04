import './component.css';

export function PricingCard({ name, price, features = [], actionLabel = 'Choose plan', onChoose, featured = false }) {
  return <article className={`cc-pricing-card${featured ? ' cc-pricing-card--featured' : ''}`}><h3>{name}</h3><strong className="cc-pricing-card__price">{price}</strong><ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul><button type="button" onClick={onChoose}>{actionLabel}</button></article>;
}
