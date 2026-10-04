import { createRoot } from 'react-dom/client';
import { ModalDialog } from '../../../scripts/seed/component-library/modal-dialog/component.jsx';
import './checkpoint-two-preview.css';

createRoot(document.getElementById('root')).render(
  <main className="checkpoint-two-preview checkpoint-two-preview--modal-dialog">
    <ModalDialog defaultOpen />
  </main>,
);