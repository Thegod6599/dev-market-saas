# Range Slider

A single-value range control with configurable bounds, live value output, and native keyboard behavior.

```jsx
import { RangeSlider } from './range-slider/component.jsx';

<RangeSlider value={intensity} onChange={setIntensity} min={0} max={10} unit=" pts" />
```

Props: `min`, `max`, `step`, controlled `value`, `defaultValue`, `onChange(number)`, `label`, and `unit`. When `value` is omitted it manages its own value.