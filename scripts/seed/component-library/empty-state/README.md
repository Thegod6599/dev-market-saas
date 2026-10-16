# Empty State Panel

A composed zero-data state that explains the situation and provides a clear next action.

```jsx
import { EmptyState } from './empty-state/component.jsx';

<EmptyState onAction={() => createItem()} onSecondaryAction={() => clearFilters()} />
```

Props: `title`, `description`, `actionLabel`, `onAction`, `secondaryLabel`, and optional `onSecondaryAction`. The secondary action is hidden unless a handler is provided.