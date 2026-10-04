import { useState } from 'react';
import './component.css';

const today = new Date();
const weekdayOffset = (today.getDay() + 6) % 7;
const baseDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - weekdayOffset);
const defaults = [
  { id: 'sync', day: 1, start: 9, end: 10, title: 'Creative sync', detail: 'Studio room', color: 'rose' },
  { id: 'review', day: 2, start: 11, end: 12.5, title: 'Review round 02', detail: 'Design team', color: 'blue' },
  { id: 'lunch', day: 3, start: 12, end: 13, title: 'Lunch & learn', detail: 'Kitchen table', color: 'ochre' },
  { id: 'handoff', day: 4, start: 14, end: 15, title: 'Print handoff', detail: 'With Rowan', color: 'sage' },
  { id: 'wrap', day: 5, start: 10, end: 11, title: 'Week wrap', detail: 'Project room', color: 'rose' },
];
const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export function CalendarSchedule({ events = defaults, onEventSelect, weekStart = baseDate }) {
  const [offset, setOffset] = useState(0);
  const start = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + offset * 7);
  const dates = dayNames.map((_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index));
  const label = dates[0].toLocaleDateString('en', { month: 'long', year: 'numeric' });
  const hours = [9, 10, 11, 12, 13, 14, 15];
  return <section className="cc-calendar" aria-label="Weekly schedule" data-testid="calendar-schedule">
    <header className="cc-calendar__header"><div><p>YOUR WEEK, AT A GLANCE</p><h2>{label}</h2></div><div className="cc-calendar__nav"><button type="button" aria-label="Previous week" data-testid="button-week-previous" onClick={() => setOffset((value) => value - 1)}>←</button><button type="button" data-testid="button-week-today" onClick={() => setOffset(0)}>This week</button><button type="button" aria-label="Next week" data-testid="button-week-next" onClick={() => setOffset((value) => value + 1)}>→</button></div></header>
    <div className="cc-calendar__grid" style={{ '--slot-count': hours.length }}><div className="cc-calendar__corner">GMT−07</div>{dates.map((date, index) => <div key={index} className={`cc-calendar__dayhead ${date.toDateString() === new Date().toDateString() ? 'is-today' : ''}`}><span>{dayNames[index]}</span><b>{String(date.getDate()).padStart(2, '0')}</b></div>)}
      <div className="cc-calendar__times">{hours.map((hour) => <span key={hour}>{`${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`}</span>)}</div>
      {dates.map((date, dayIndex) => <div className="cc-calendar__day" key={dayIndex} data-testid={`column-schedule-${dayIndex}`}>{hours.map((hour) => <div className="cc-calendar__slot" key={hour}></div>)}{events.filter((event) => event.day === dayIndex + 1).map((event) => <button type="button" key={event.id} className={`cc-calendar__event cc-calendar__event--${event.color}`} style={{ '--event-top': `${(event.start - 9) * 43}px`, '--event-height': `${(event.end - event.start) * 43}px` }} data-testid={`event-${event.id}`} onClick={() => onEventSelect?.(event)}><strong>{event.title}</strong><span>{event.detail}</span></button>)}</div>)}
    </div>
  </section>;
}