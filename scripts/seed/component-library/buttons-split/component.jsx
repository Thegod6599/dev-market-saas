export function SplitButton({ label, options = [] }) {
  return <div><button>{label}</button><select aria-label="More actions">{options.map((option) => <option key={option}>{option}</option>)}</select></div>;
}