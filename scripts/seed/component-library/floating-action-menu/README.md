# Floating Action Menu

A FAB-style action launcher that reveals a short, right-aligned menu. Selecting an item calls `onSelect` and closes the menu; Escape and outside clicks also dismiss it.

```jsx
import { FloatingActionMenu } from './floating-action-menu/component.jsx';

<FloatingActionMenu onSelect={(item) => create(item.id)} />
```

Props: `items` is an array of `{ id, label, mark }`; `onSelect(item)` handles the chosen action; `label` names the menu. The component is self-contained and uses no icon dependency.