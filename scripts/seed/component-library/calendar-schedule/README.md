# Calendar Schedule

A five-day working-week calendar with hour slots, event blocks, week navigation, and responsive horizontal overflow for narrow screens.

```jsx
import { CalendarSchedule } from './calendar-schedule/component.jsx';

<CalendarSchedule onEventSelect={(event) => openEvent(event.id)} />
```

Props: `events` uses `{ id, day (1–5), start, end, title, detail, color }`; `weekStart` accepts a Date; `onEventSelect(event)` fires for clicked entries. The default event set makes the component useful without props.