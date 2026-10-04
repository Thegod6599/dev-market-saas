# Resource Card

A reusable link card for articles, guides, and downloadable resources.

## Setup and usage

Copy `ResourceCard.jsx` and `ResourceCard.css` into a React 18+ JSX project.

```jsx
import { ResourceCard } from './ResourceCard.jsx';

<ResourceCard category="Guide" title="Design system basics" description="A practical introduction to reusable interface foundations." href="/guides/design-systems" />
```

## Props

- `title`, `description`, `href`: card content and destination.
- `category`: optional eyebrow label.
- `linkLabel`: link text, defaults to “Read more”.

## Customize

Adjust the `.cc-resource-card` styles to fit your brand. React is the only runtime dependency.
