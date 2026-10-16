# Tabs Panel

A content panel with accessible tab semantics and Left/Right arrow-key navigation.

```jsx
import { TabsPanel } from './tabs-panel/component.jsx';

<TabsPanel onChange={(tabId) => trackTab(tabId)} />
```

Props: `tabs` accepts `{ id, label, eyebrow, content }[]`; `activeTab` makes selection controlled; `defaultActiveTab` sets the initial uncontrolled selection; `onChange(id)` receives selection; `title` labels the panel. Supply stable unique tab IDs.