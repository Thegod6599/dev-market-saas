import { createRoot } from 'react-dom/client';
import { ToggleSettings } from '../../../scripts/seed/component-library/toggle-settings/component.jsx';
import './checkpoint-two-preview.css';

createRoot(document.getElementById('root')).render(
  <main className="checkpoint-two-preview checkpoint-two-preview--toggle-settings">
    <ToggleSettings />
  </main>,
);