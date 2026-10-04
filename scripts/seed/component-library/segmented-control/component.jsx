import { useState } from 'react';
import './component.css';

const defaults = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
];

export function SegmentedControl({
  options = defaults,
  value,
  defaultValue,
  onChange,
  name = 'view',
  ariaLabel = 'Choose view',
  disabled = false,
}) {
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value);
  const selected = value ?? internal;
  const enabledIndex = options.findIndex((option) => !disabled && !option.disabled);
  const selectedIndex = options.findIndex(
    (option) => option.value === selected && !disabled && !option.disabled,
  );
  const tabStop = selectedIndex >= 0 ? selectedIndex : enabledIndex;

  const choose = (option) => {
    if (value === undefined) setInternal(option.value);
    onChange?.(option.value, option);
  };

  const keyMove = (event, index) => {
    if (disabled || !options.length) return;
    let target = -1;

    if (event.key === 'Home') {
      target = enabledIndex;
    } else if (event.key === 'End') {
      for (let candidate = options.length - 1; candidate >= 0; candidate -= 1) {
        if (!options[candidate].disabled) {
          target = candidate;
          break;
        }
      }
    } else {
      const direction = ['ArrowRight', 'ArrowDown'].includes(event.key)
        ? 1
        : ['ArrowLeft', 'ArrowUp'].includes(event.key)
          ? -1
          : 0;
      if (!direction) return;
      for (let distance = 1; distance <= options.length; distance += 1) {
        const candidate = (index + direction * distance + options.length) % options.length;
        if (!options[candidate].disabled) {
          target = candidate;
          break;
        }
      }
    }

    if (target < 0) return;
    event.preventDefault();
    const option = options[target];
    choose(option);
    event.currentTarget.parentElement
      ?.querySelectorAll('[role=radio]')[target]
      ?.focus();
  };

  return (
    <div className="cc-segments" role="radiogroup" aria-label={ariaLabel} aria-disabled={disabled}>
      {options.map((option, index) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={selected === option.value}
          aria-disabled={disabled || !!option.disabled}
          disabled={disabled || option.disabled}
          name={name}
          tabIndex={index === tabStop ? 0 : -1}
          onClick={() => choose(option)}
          onKeyDown={(event) => keyMove(event, index)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}