import './component.css';

export function SplitButton({ label, options = [], onSelect, ...props }) {
  return <div className="cc-split-button"><button type="button" onClick={props.onClick}>{label}</button><select aria-label="More actions" defaultValue="" onChange={(event) => { if (event.target.value) onSelect?.(event.target.value); }}><option value="" disabled>More</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></div>;
}
