import './component.css';

const sampleEvents = [
  { id: 'a', actor: 'Mina Park', action: 'approved the new brief', detail: 'Brand refresh · Editorial system', time: '12 min ago', type: 'approval' },
  { id: 'b', actor: 'Theo Grant', action: 'left a comment', detail: '“The revised type scale feels right.”', time: '1 hr ago', type: 'comment' },
  { id: 'c', actor: 'You', action: 'uploaded 3 files', detail: 'Campaign / final-artwork', time: 'Yesterday', type: 'upload' },
];
const marks = { approval: '✓', comment: '“', upload: '↑', update: '↻' };

export function ActivityTimeline({ events = sampleEvents, title = 'Recent activity', onEventClick }) {
  return <section className="cc-timeline" aria-label={title}>
    <header><div><span className="cc-timeline__eyebrow">THE STUDIO</span><h2>{title}</h2></div><span className="cc-timeline__count">{events.length} events</span></header>
    {events.length ? <ol>{events.map((event) => <li key={event.id} className={`cc-timeline__event cc-timeline__event--${event.type || 'update'}`}>
      <span className="cc-timeline__marker" aria-hidden="true">{marks[event.type] || marks.update}</span>
      <div className="cc-timeline__body">
        <p><strong>{event.actor}</strong> {event.action}</p>
        {event.detail && (onEventClick ? (
          <button type="button" onClick={() => onEventClick(event)} className="cc-timeline__detail">
            {event.detail}
          </button>
        ) : (
          <p className="cc-timeline__detail cc-timeline__detail--static">{event.detail}</p>
        ))}
        <time>{event.time}</time>
      </div>
    </li>)}</ol> : <p className="cc-timeline__empty">Nothing has happened yet. New activity will appear here.</p>}
  </section>;
}