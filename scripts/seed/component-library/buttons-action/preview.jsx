import { ActionButton } from './component.jsx';
import './component.css';

function Checkmark() {
  return <span aria-hidden="true">✓</span>;
}

export default function Preview() {
  return (
    <section className="action-set-preview" aria-labelledby="action-set-title">
      <header className="action-set-preview__header">
        <span className="action-set-preview__eyebrow">INTERFACE PRIMITIVES / 01</span>
        <h1 id="action-set-title">Action Button Set</h1>
        <p>Three dependable treatments for clear, considered actions.</p>
      </header>

      <div className="action-set-preview__examples">
        <article className="action-set-preview__example">
          <div className="action-set-preview__label">
            <strong>Primary</strong>
            <span>For the main action</span>
          </div>
          <div className="action-set-preview__controls">
            <ActionButton><Checkmark />Create project</ActionButton>
            <ActionButton disabled>Unavailable</ActionButton>
          </div>
        </article>

        <article className="action-set-preview__example">
          <div className="action-set-preview__label">
            <strong>Secondary</strong>
            <span>For a useful alternative</span>
          </div>
          <div className="action-set-preview__controls">
            <ActionButton variant="secondary">View details</ActionButton>
            <ActionButton variant="secondary" disabled>Unavailable</ActionButton>
          </div>
        </article>

        <article className="action-set-preview__example">
          <div className="action-set-preview__label">
            <strong>Quiet</strong>
            <span>For a lower emphasis action</span>
          </div>
          <div className="action-set-preview__controls">
            <ActionButton variant="quiet">Not now</ActionButton>
            <ActionButton variant="quiet" disabled>Unavailable</ActionButton>
          </div>
        </article>
      </div>

      <footer className="action-set-preview__footer">
        <span><i aria-hidden="true" /> Keyboard focus visible</span>
        <span>Native button behavior</span>
      </footer>
    </section>
  );
}
