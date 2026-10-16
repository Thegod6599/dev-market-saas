# Feature Grid

## Purpose
A content-first feature section with a restrained editorial layout. Feature icons may be any supplied React node.

## Setup and import
Copy into a React 18+ JSX project; the component imports `component.css`.
```jsx
import { FeatureGrid } from './feature-grid/component.jsx';
```

## Usage
```jsx
<FeatureGrid
  eyebrow="THE APPROACH"
  title="Details make the difference."
  columns={2}
  features={[
    { title: 'A shared canvas', description: 'Keep ideas close to the work.', icon: <BrandGlyph /> },
    { title: 'Clear next steps', description: 'Move decisions into action.', href: '/process' }
  ]}
/>
```

## Props
- `features`: `{ title, description, icon?, href?, linkLabel? }` records.
- `eyebrow`: small section kicker.
- `title`: section heading.
- `columns`: desired desktop column count (clamped to 1–4).

## Customization
The feature grid uses local color/type rules and a mobile stacked layout. Tune `.cc-features` and its item selectors without global CSS.