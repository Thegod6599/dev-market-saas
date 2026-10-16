# Action Button Set

A standalone set of primary, secondary, and quiet buttons for common interface actions. The component uses native buttons and includes focus, disabled, hover, active, and reduced-motion states.

## Setup

Copy the `ActionButtonSet` folder into a React 18+ project with a JSX-capable build tool. The component imports its included stylesheet automatically.

```jsx
import { ActionButton } from './ActionButtonSet/ActionButtonSet.jsx';

export function SaveActions() {
  return (
    <div>
      <ActionButton onClick={save}>Save changes</ActionButton>
      <ActionButton variant="secondary" onClick={cancel}>Cancel</ActionButton>
      <ActionButton variant="quiet" onClick={skip}>Not now</ActionButton>
    </div>
  );
}
```

## Props

- `children`: button content.
- `variant`: `primary` (default), `secondary`, or `quiet`. Unknown values fall back to `primary`.
- `className`: optional classes appended to the component class.
- `type`: native button type, defaults to `button`.
- Native button props such as `onClick`, `disabled`, and `aria-label` are forwarded.

## Customization

Override `.action-button` and `.action-button--*` in `ActionButtonSet.css` to adjust color, shape, and spacing. Styles use no project-wide variables.

## Dependencies

React 18 or newer and a JSX-capable build tool. No additional runtime packages are required.
