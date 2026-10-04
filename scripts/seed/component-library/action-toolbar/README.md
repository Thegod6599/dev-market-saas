# Action Toolbar

A small editor-style toolbar with toggleable actions. The default buttons demonstrate pressed state and report each change to a callback.

## Usage

```jsx
import { ActionToolbar } from './action-toolbar/component.jsx';

<ActionToolbar onAction={(action, selectedIds) => applyFormat(action.id, selectedIds)} />
```

## Props

- `actions`: `{ id, label, mark }[]`; defaults to Bold, Italic, and Underline.
- `selected`: initially active action IDs.
- `onAction(action, selectedIds)`: called after a toggle.
- `label`: accessible toolbar name.

Uses native buttons, `aria-pressed`, and visible keyboard focus. Import the component CSS alongside the JSX.