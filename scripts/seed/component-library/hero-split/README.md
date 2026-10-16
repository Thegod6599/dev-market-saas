# Split Hero

A two-column hero pairing a message and action with a visual, illustration, or product preview.

## Setup and usage

Copy `SplitHero.jsx` and `SplitHero.css` into a React 18+ JSX project.

```jsx
import { SplitHero } from './SplitHero.jsx';

<SplitHero eyebrow="Workspace" title="See the whole picture." description="Keep your team's projects, people, and plans connected." action={{ href: '/tour', label: 'Explore the tour' }} visual={<img src="/dashboard.png" alt="Dashboard overview" />} />
```

## Props

- `eyebrow`, `title`, `description`: copy shown in the text column.
- `visual`: optional React content for the visual column.
- `action`: optional `{ href, label }` link.

## Customize

The `.cc-split-hero` styles collapse to one column on narrow screens. React is the only runtime dependency.
