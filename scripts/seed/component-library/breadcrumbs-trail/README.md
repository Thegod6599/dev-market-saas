# Breadcrumb Trail

## Purpose
Accessible breadcrumb navigation for showing where the current page sits in a hierarchy.

## Setup and import
Copy this folder into a JSX-enabled React project (React 18+). The component imports its companion `component.css`; no other package or global stylesheet is required.

```jsx
import { BreadcrumbTrail } from './breadcrumbs-trail/component.jsx';
```

## Usage
```jsx
<BreadcrumbTrail items={[
  { label: 'Home', href: '/' },
  { label: 'Library', href: '/library' },
  { label: 'Patterns' }
]} />
```

## Props
- `items`: ordered `{ label, href? }` objects. The final item is marked as the current page.
- `className`: optional root class.

## Customization
Adjust `.cc-breadcrumbs` rules in `component.css`; styles are component-scoped and use system fonts and local colors.