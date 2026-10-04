# Dashboard Layout

A responsive shell that pairs a sidebar region with a main dashboard area.

## Setup and usage

Copy `DashboardLayout.jsx` and `DashboardLayout.css` into a React 18+ JSX project.

```jsx
import { DashboardLayout } from './DashboardLayout.jsx';

<DashboardLayout sidebar={<nav>Workspace links</nav>} header={<h1>Overview</h1>}>
  <section>Dashboard content</section>
</DashboardLayout>
```

## Props

- `sidebar`: content for the side rail.
- `header`: optional heading or toolbar above the main content.
- `children`: primary content area.

## Customize

The layout collapses into stacked regions on narrow screens. Style `.cc-dashboard-layout` and its child selectors to fit your app. React is the only runtime dependency.
