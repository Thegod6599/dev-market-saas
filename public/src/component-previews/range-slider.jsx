import { createRoot } from 'react-dom/client';
import { RangeSlider } from '../../../scripts/seed/component-library/range-slider/component.jsx';
import './checkpoint-two-preview.css';

createRoot(document.getElementById('root')).render(
  <main className="checkpoint-two-preview checkpoint-two-preview--range-slider">
    <RangeSlider />
  </main>,
);