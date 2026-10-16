import { useState } from 'react';
import './component.css';

export function FormStepper({ steps = [{ title: 'Details', children: 'Add the key information for this request.' }, { title: 'Review', children: 'Check everything before you continue.' }, { title: 'Finish', children: 'You are ready to submit.' }], activeStep, defaultStep = 0, onStepChange, onNext, onPrevious, onComplete, nextLabel = 'Continue', previousLabel = 'Back' }) {
  const [internal, setInternal] = useState(defaultStep);
  const controlled = activeStep !== undefined;
  const current = Math.max(0, Math.min(controlled ? activeStep : internal, steps.length - 1));
  const change = (next) => { if (!controlled) setInternal(next); onStepChange?.(next); };
  const previous = () => { if (current > 0) { onPrevious?.(current); change(current - 1); } };
  const next = () => { if (current < steps.length - 1) { onNext?.(current); change(current + 1); } else onComplete?.(); };
  if (!steps.length) return null;
  return <section className="cc-stepper" aria-label="Multi-step form">
    <ol className="cc-stepper__progress" aria-label="Progress">{steps.map((step, index) => <li key={`${step.title}-${index}`} className={index < current ? 'is-complete' : index === current ? 'is-current' : ''} aria-current={index === current ? 'step' : undefined}><span>{index < current ? '✓' : index + 1}</span><small>{step.title}</small></li>)}</ol>
    <div className="cc-stepper__content" aria-live="polite"><span>STEP {String(current + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span><h2>{steps[current].title}</h2><div>{steps[current].children}</div></div>
    <footer><button type="button" className="cc-stepper__back" onClick={previous} disabled={current === 0}>{previousLabel}</button><button type="button" className="cc-stepper__next" onClick={next}>{current === steps.length - 1 ? 'Complete' : nextLabel}</button></footer>
  </section>;
}