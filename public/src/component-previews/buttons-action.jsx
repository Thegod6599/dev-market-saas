import { createRoot } from 'react-dom/client';
import { ActionButton } from '../../../scripts/seed/component-library/buttons-action/component.jsx';
import './buttons-action.css';

function ActionButtonSetPreview() {
  return (
    <main className="action-preview" aria-label="Action Button Set examples">
      <ActionButton>Get started</ActionButton>
      <ActionButton variant="secondary">Learn more</ActionButton>
      <ActionButton variant="quiet">Skip for now</ActionButton>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<ActionButtonSetPreview />);
