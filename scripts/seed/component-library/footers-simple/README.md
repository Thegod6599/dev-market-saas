# Simple Footer

A low-profile footer with brand name, a short navigation list, and a copyright note.

## Setup and usage

Copy `SimpleFooter.jsx` and `SimpleFooter.css` into a React 18+ JSX project.

```jsx
import { SimpleFooter } from './SimpleFooter.jsx';

<SimpleFooter brand="Northstar" links={[{ label: 'Privacy', href: '/privacy' }, { label: 'Contact', href: '/contact' }]} />
```

## Props

- `brand`: product or company name.
- `links`: array of `{ label, href }` navigation items.
- `copyright`: optional note shown after the links.

## Customize

Change the `.cc-simple-footer` selectors to match your theme. React is the only runtime dependency.
