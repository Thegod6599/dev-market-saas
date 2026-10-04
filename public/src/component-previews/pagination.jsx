import { createRoot } from 'react-dom/client';
import { Pagination } from '../../../scripts/seed/component-library/pagination/component.jsx';
import './checkpoint-two-preview.css';

createRoot(document.getElementById('root')).render(
  <main className="checkpoint-two-preview checkpoint-two-preview--pagination">
    <Pagination />
  </main>,
);