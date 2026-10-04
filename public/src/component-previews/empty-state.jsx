import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { EmptyState } from '../../../scripts/seed/component-library/empty-state/component.jsx';
import './checkpoint-two-preview.css';

function EmptyStatePreview() {
  const [message, setMessage] = useState('');

  return (
    <main className="checkpoint-two-preview checkpoint-two-preview--empty-state">
      <EmptyState
        onAction={() => setMessage('A new item is ready to add.')}
        onSecondaryAction={() => setMessage('The filters have been cleared.')}
      />
      <p className="checkpoint-two-preview__notice" aria-live="polite">{message}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<EmptyStatePreview />);