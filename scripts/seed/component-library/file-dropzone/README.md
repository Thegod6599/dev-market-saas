# File Dropzone

## Purpose
Pick local files by clicking, keyboard activation, or drag and drop. This component validates file types and reports selected `File` objects; it does not upload or send data anywhere.

## Setup and import
Copy into a React 18+ JSX project. Its CSS import is local to the component.
```jsx
import { FileDropzone } from './file-dropzone/component.jsx';
```

## Usage
```jsx
<FileDropzone accept="image/*,.pdf" multiple onFilesSelected={(files) => setFiles(files)} />
```

## Props
- `accept`: comma-separated extensions or MIME types, including `image/*`.
- `multiple`: allow more than one file.
- `onFilesSelected`: receives an array of accepted browser `File` objects.
- `label`, `hint`: visible instructions.
- `disabled`: disables selection.

## Customization
Style the `.cc-dropzone` rules and states in `component.css`. Browser-native file input handles selection; no network or upload behavior is included.