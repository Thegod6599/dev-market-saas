import { useId, useState } from 'react';
import './component.css';

export function RangeSlider({ min = 0, max = 100, step = 1, value: controlledValue, defaultValue = 64, onChange, label = 'Intensity', unit = '%' }) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const inputId = useId();
  const value = Math.min(max, Math.max(min, controlledValue ?? localValue));
  const update = (event) => { const next = Number(event.target.value); if (controlledValue === undefined) setLocalValue(next); onChange?.(next); };
  return <section className="cc-range" aria-label="Range control" data-testid="panel-range-slider">
    <header><div><p>FINE TUNE</p><h2>{label}</h2></div><output htmlFor={inputId} data-testid="text-range-value">{value}<small>{unit}</small></output></header>
    <div className="cc-range__control"><input id={inputId} type="range" min={min} max={max} step={step} value={value} onChange={update} aria-label={label} data-testid="input-range-slider" style={{ '--range-fill': `${max > min ? ((value - min) / (max - min)) * 100 : 0}%` }} /><div className="cc-range__limits"><span>{min}{unit}</span><span>{max}{unit}</span></div></div>
    <footer><span className="cc-range__status"><i></i> Live preview</span><span>Drag or use arrow keys</span></footer>
  </section>;
}