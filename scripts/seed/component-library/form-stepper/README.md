# Form Stepper

## Purpose
Wrap multi-step content with a progress trail and previous/continue/complete actions.

## Setup and import
Copy into a React 18+ JSX project. Styles are imported from the same folder.
```jsx
import { FormStepper } from './form-stepper/component.jsx';
```

## Usage
```jsx
<FormStepper
  steps={[{ title: 'Account', children: <AccountFields /> }, { title: 'Confirm', children: <Review /> }]}
  onStepChange={(index) => console.log(index)}
  onComplete={() => submitForm()}
/>
```

## Props
- `steps`: `{ title, children }` step array.
- `activeStep`: controlled current index; use with `onStepChange`.
- `defaultStep`: initial uncontrolled step.
- `onStepChange`: called with the destination index.
- `onNext`, `onPrevious`: called with the step being left.
- `onComplete`: called when completing the final step.
- `nextLabel`, `previousLabel`: navigation labels.

## Customization
Modify `.cc-stepper` styles to match the host form. Step navigation is local UI only; form submission remains the consuming app's responsibility.