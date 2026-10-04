import { createRoot } from 'react-dom/client';
import { ActionToolbar } from '../../../scripts/seed/component-library/action-toolbar/component.jsx';
import './checkpoint-two-preview.css';

createRoot(document.getElementById('root')).render(
  <main className="checkpoint-two-preview checkpoint-two-preview--action-toolbar">
    <ActionToolbar />
  </main>,
);