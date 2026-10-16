# Modern Navbar

A responsive primary navigation bar with brand, links, and an optional call to action.

## Setup and usage

Copy `ModernNavbar.jsx` and `ModernNavbar.css` into a React 18+ JSX project.

```jsx
import { ModernNavbar } from './ModernNavbar.jsx';

<ModernNavbar brand="Northstar" links={[{ label: 'Product', href: '/product' }, { label: 'Journal', href: '/journal' }]} action={{ label: 'Sign in', href: '/login' }} />
```

## Props

- `brand`: product name, defaults to “Northstar”.
- `links`: array of `{ label, href }` items.
- `action`: optional `{ label, href }` call-to-action link.

## Customize

Use `.cc-modern-navbar` selectors to set your palette and spacing. React is the only runtime dependency.
