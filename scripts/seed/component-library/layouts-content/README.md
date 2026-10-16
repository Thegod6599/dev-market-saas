# Content Layout

A constrained editorial layout for long-form content, documentation, or articles.

## Setup and usage

Copy `ContentLayout.jsx` and `ContentLayout.css` into a React 18+ JSX project.

```jsx
import { ContentLayout } from './ContentLayout.jsx';

<ContentLayout eyebrow="Field notes" title="Designing for focus" description="A few principles for quieter interfaces.">
  <p>Long-form content stays readable across desktop and mobile screens.</p>
</ContentLayout>
```

## Props

- `title`: page heading.
- `eyebrow`, `description`: optional supporting copy.
- `children`: article content.

## Customize

Adjust `.cc-content-layout` widths, type, and colors. React is the only runtime dependency.
