# Metric Strip

## Purpose
A compact horizontal dashboard summary for a small set of key values and movement.

## Setup and import
Copy into a React 18+ JSX application. `component.jsx` imports its standalone CSS.
```jsx
import { MetricStrip } from './metric-strip/component.jsx';
```

## Usage
```jsx
<MetricStrip title="Quarterly snapshot" metrics={[
  { label: 'Open work', value: '24', delta: '+4', detail: 'this quarter', trend: 'up' },
  { label: 'On schedule', value: '91.6%', detail: 'across 12 projects' }
]} />
```

## Props
- `metrics`: `{ label, value, delta?, detail?, trend? }` items. Trend may be `up`, `down`, or `neutral`.
- `title`: accessible region label and visible heading.

## Customization
Adjust `.cc-metrics` palette and spacing. On narrow screens, items convert to a compact vertical summary.