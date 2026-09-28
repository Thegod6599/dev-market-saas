# Action Button Set

A standalone React button with primary, secondary, and quiet variants.

## Use

Copy this directory into a React/Vite app:

```jsx
import { ActionButton } from './ActionButtonSet/ActionButtonSet.jsx';
import './ActionButtonSet/ActionButtonSet.css';

<ActionButton onClick={() => save()}>Save changes</ActionButton>
<ActionButton variant="secondary">Cancel</ActionButton>
```

## Props

- `children`: button contents.
- `variant`: `primary` (default), `secondary`, or `quiet`.
- `className`: optional additional class names.
- `type`: native button type (defaults to `button`).
- All other native button props are forwarded.

## Customize

Adjust the `.action-button--*` rules in the CSS file. Styles are self-contained, use no global variables, and include keyboard focus and reduced-motion support.

## Requirements

React 18+ and a JSX-capable build. No extra packages required.
