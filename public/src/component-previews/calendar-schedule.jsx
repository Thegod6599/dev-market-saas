import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CalendarSchedule } from '../../../scripts/seed/component-library/calendar-schedule/component.jsx';
import './checkpoint-two-preview.css';

function CalendarSchedulePreview() {
  const [selected, setSelected] = useState('');

  return (
    <main className="checkpoint-two-preview checkpoint-two-preview--calendar-schedule">
      <CalendarSchedule onEventSelect={(event) => setSelected(event.title)} />
      {selected && (
        <p className="checkpoint-two-preview__notice" aria-live="polite">
          Selected: {selected}
        </p>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<CalendarSchedulePreview />);