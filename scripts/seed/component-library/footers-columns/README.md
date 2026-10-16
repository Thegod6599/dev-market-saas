# Column Footer

A responsive footer with a brand introduction, grouped links, and copyright line.

## Setup and usage

Copy `ColumnFooter.jsx` and `ColumnFooter.css` into a React 18+ JSX project.

```jsx
import { ColumnFooter } from './ColumnFooter.jsx';

<ColumnFooter brand="Northstar" columns={[{ title: 'Product', links: [{ label: 'Features', href: '/features' }] }]} />
```

## Props

- `brand`: product or company name.
- `columns`: array of `{ title, links }`; each link has `label` and `href`.
- `copyright`: bottom note.

## Customize

Tune the `.cc-column-footer` selectors for typography and colors. React is the only runtime dependency.
