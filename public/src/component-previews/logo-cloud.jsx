import { createRoot } from 'react-dom/client';
import { LogoCloud } from '../../../scripts/seed/component-library/logo-cloud/component.jsx';
import './checkpoint-two-preview.css';

createRoot(document.getElementById('root')).render(
  <main className="checkpoint-two-preview checkpoint-two-preview--logo-cloud">
    <LogoCloud />
  </main>,
);