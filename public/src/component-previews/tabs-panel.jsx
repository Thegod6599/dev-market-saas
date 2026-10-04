import { createRoot } from 'react-dom/client';
import { TabsPanel } from '../../../scripts/seed/component-library/tabs-panel/component.jsx';
import './checkpoint-two-preview.css';

createRoot(document.getElementById('root')).render(
  <main className="checkpoint-two-preview checkpoint-two-preview--tabs-panel">
    <TabsPanel />
  </main>,
);