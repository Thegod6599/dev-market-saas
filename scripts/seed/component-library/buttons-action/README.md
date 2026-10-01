# Action Button Set

## Description

A reusable React button component with primary, secondary, and quiet action styles. It uses a native button element and includes keyboard focus, disabled, and reduced-motion states.

## Installation

Copy the ActionButtonSet folder into your React/Vite project's source tree, such as src/components/ActionButtonSet/. The project needs React 18 or newer and a JSX-capable build tool.

## Import

The component imports its companion CSS file automatically:

    import { ActionButton } from './components/ActionButtonSet/ActionButtonSet.jsx';

## Usage

    import { ActionButton } from './components/ActionButtonSet/ActionButtonSet.jsx';

    export function SaveActions() {
      return (
        <div>
          <ActionButton onClick={() => console.log('Saved')}>Save changes</ActionButton>
          <ActionButton variant="secondary" onClick={() => console.log('Cancelled')}>
            Cancel
          </ActionButton>
        </div>
      );
    }

## Props

- children: content displayed inside the button.
- variant: primary (default), secondary, or quiet. Unknown values use primary.
- className: optional class names added to the button.
- type: native button type; defaults to button.
- Other native button props, such as onClick, disabled, and aria-label, are forwarded to the underlying button.

## Customization

Edit the .action-button and .action-button--* rules in ActionButtonSet.css. The styles are component-scoped and use no project-wide CSS variables.

## Requirements

React 18 or newer and a JSX-capable build tool. No additional runtime packages are required.
