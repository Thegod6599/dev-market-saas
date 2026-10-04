# Stacked Navigation

A compact titled navigation group for product areas, documentation, or secondary navigation.

## Setup and usage

Copy `StackedNavigation.jsx` and `StackedNavigation.css` into a React 18+ JSX project.

```jsx
import { StackedNavigation } from './StackedNavigation.jsx';

<StackedNavigation title="Workspace" activeHref="/projects" items={[{ label: 'Overview', href: '/' }, { label: 'Projects', href: '/projects' }]} />
```

## Props

- `title`: navigation group heading.
- `items`: array of `{ label, href }` links.
- `activeHref`: optional href marked as the current page.

## Customize

Edit `.cc-stacked-navigation` selectors to tune the active and hover states. React is the only runtime dependency.
