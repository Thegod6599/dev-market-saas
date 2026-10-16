# Pricing Card

A focused plan card with price, included features, and a configurable action.

## Setup and usage

Copy `PricingCard.jsx` and `PricingCard.css` into a React 18+ JSX project.

```jsx
import { PricingCard } from './PricingCard.jsx';

<PricingCard name="Studio" price="$24 / month" features={['Unlimited projects', 'Priority support']} featured onChoose={() => startCheckout()} />
```

## Props

- `name`, `price`: plan heading and price display.
- `features`: list of included feature strings.
- `actionLabel`: button text, defaults to “Choose plan”.
- `onChoose`: optional button callback.
- `featured`: applies an emphasized border treatment.

## Customize

Edit `.cc-pricing-card` selectors for the palette and spacing. React is the only runtime dependency; connect `onChoose` to your own checkout flow.
