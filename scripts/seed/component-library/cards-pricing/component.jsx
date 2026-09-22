export function PricingCard({ name, price, features = [] }) {
  return <article><h3>{name}</h3><strong>{price}</strong><ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul><button>Choose plan</button></article>;
}