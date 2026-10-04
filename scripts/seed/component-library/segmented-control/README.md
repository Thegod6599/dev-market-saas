# Segmented Control

## Purpose
A compact, accessible single-selection control suited to switching between related views.

## Setup and import
Copy into a React 18+ JSX project; the component imports the included stylesheet.
```jsx
import { SegmentedControl } from './segmented-control/component.jsx';
```

## Usage
```jsx
<SegmentedControl options={[{ label: 'List', value: 'list' }, { label: 'Board', value: 'board' }]} defaultValue="list" onChange={(value) => setView(value)} />
```

## Props
- `options`: `{ label, value, disabled? }` options.
- `value`: controlled selected value.
- `defaultValue`: initial uncontrolled selection.
- `onChange`: receives `(value, option)`.
- `name`: optional name attribute.
- `ariaLabel`: accessible group name.
- `disabled`: disables the entire control.

## Customization
Adjust `.cc-segments` and its checked/disabled/focus states in the local CSS. Arrow keys and Home/End move selection.