# Icon Action Button

A compact icon-only action button with an accessible name and a clear keyboard focus state.

## Setup

Copy `IconButton.jsx` and `IconButton.css` into a React 18+ JSX project. The component imports its stylesheet automatically.

```jsx
import { IconButton } from './IconButton.jsx';

<IconButton label="Open settings"><span aria-hidden="true">⚙</span></IconButton>
```

## Props

- `label` (required): accessible name announced by assistive technology.
- `children`: icon content, usually an inline SVG or icon component.
- Other native button props such as `disabled` and `onClick` are forwarded.

## Customize

Override the `.cc-icon-button` styles in the included CSS. No additional runtime dependencies are required.
