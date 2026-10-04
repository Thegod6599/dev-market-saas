# Kanban Board

A small project board with three lanes. Cards can move by native drag-and-drop or by the per-card select control; the header form adds new cards.

```jsx
import { KanbanBoard } from './kanban-board/component.jsx';

<KanbanBoard onChange={(lanes) => saveBoard(lanes)} />
```

Props: `initialCards` maps lane IDs (`planned`, `doing`, `done`) to card arrays. Card shape: `{ id, title, owner, tone, due }`. `onChange(lanes)` receives the resulting board after a move or addition.