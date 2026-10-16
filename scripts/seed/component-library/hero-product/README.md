# Product Hero

A focused landing-page introduction with eyebrow, headline, supporting copy, and primary action.

## Setup and usage

Copy `ProductHero.jsx` and `ProductHero.css` into a React 18+ JSX project.

```jsx
import { ProductHero } from './ProductHero.jsx';

<ProductHero eyebrow="A calmer workflow" title="Make room for your best work." description="Bring the moving pieces of your team into one thoughtful workspace." action={{ href: '/start', label: 'Get started' }} />
```

## Props

- `eyebrow`, `title`, `description`: content for the hero.
- `action`: optional `{ href, label }` link; defaults to a “Get started” action.

## Customize

Adjust the `.cc-product-hero` rules, including its responsive type scale and background. React is the only runtime dependency.
