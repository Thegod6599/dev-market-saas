# Sortable Data Table

## Purpose
A compact data table that sorts by any column and reshapes into readable records on narrow screens.

## Setup and import
Copy this folder into a React 18+ JSX project. `component.jsx` imports its scoped stylesheet.
```jsx
import { SortableDataTable } from './data-table/component.jsx';
```

## Usage
```jsx
<SortableDataTable
  rows={[{ id: 1, name: 'Atlas', seats: 24 }]}
  columns={[
    { key: 'name', label: 'Workspace' },
    { key: 'seats', label: 'Seats', sortValue: (row) => row.seats, render: (value) => `${value} seats` }
  ]}
  getRowKey={(row) => row.id}
/>
```

## Props
- `rows`: data array.
- `columns`: `{ key, label, render?, sortValue? }` descriptors.
- `getRowKey`: optional `(row, index) => stableKey`; defaults to `row.id` then index.
- `emptyMessage`: message used when no rows exist.

## Customization
Update `.cc-table` styles to tune typography, borders, and breakpoints. Sorting toggles ascending/descending when the same heading is activated.