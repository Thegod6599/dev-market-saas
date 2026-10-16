import { useId } from 'react';
import './component.css';

export function EmptyState({ title = 'Nothing in the queue', description = 'When new work arrives, it will find a home here. Start with a fresh item or adjust your filters.', actionLabel = 'Create a new item', onAction, secondaryLabel = 'Clear filters', onSecondaryAction }) {
  const titleId = useId();
  return <section className="cc-empty" aria-labelledby={titleId} data-testid="panel-empty-state">
    <div className="cc-empty__art" aria-hidden="true"><span className="cc-empty__ring"></span><span className="cc-empty__tile">—</span><span className="cc-empty__spark">+</span></div>
    <p className="cc-empty__eyebrow">A LITTLE ROOM TO BREATHE</p><h2 id={titleId} data-testid="text-empty-title">{title}</h2><p className="cc-empty__description" data-testid="text-empty-description">{description}</p>
    <div className="cc-empty__actions"><button type="button" data-testid="button-empty-primary" onClick={onAction}>{actionLabel}<span aria-hidden="true">↗</span></button>{onSecondaryAction && <button type="button" className="cc-empty__secondary" data-testid="button-empty-secondary" onClick={onSecondaryAction}>{secondaryLabel}</button>}</div>
  </section>;
}