import { createRoot } from 'react-dom/client';
import { KanbanBoard } from '../../../scripts/seed/component-library/kanban-board/component.jsx';
import './checkpoint-two-preview.css';

createRoot(document.getElementById('root')).render(
  <main className="checkpoint-two-preview checkpoint-two-preview--kanban-board">
    <KanbanBoard />
  </main>,
);