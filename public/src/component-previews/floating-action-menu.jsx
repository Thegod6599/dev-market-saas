import { createRoot } from 'react-dom/client';
import { FloatingActionMenu } from '../../../scripts/seed/component-library/floating-action-menu/component.jsx';
import './checkpoint-two-preview.css';

createRoot(document.getElementById('root')).render(
  <main className="checkpoint-two-preview checkpoint-two-preview--floating-action-menu">
    <FloatingActionMenu defaultOpen />
  </main>,
);