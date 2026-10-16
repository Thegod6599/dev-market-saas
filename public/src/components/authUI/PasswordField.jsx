import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './PasswordField.module.css';

function PasswordField({
  id,
  label,
  value,
  onChange,
  autoComplete = 'new-password',
  required = true,
  minLength = 6,
  disabled = false,
  testId,
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <div className={styles.inputWrap}>
        <input
          id={id}
          name={id}
          className={styles.input}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          disabled={disabled}
          data-testid={testId || `input-${id}`}
        />
        <button
          className={styles.toggle}
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={`${isVisible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
          aria-pressed={isVisible}
          disabled={disabled}
          data-testid={`toggle-${id}`}
        >
          {isVisible
            ? <EyeOff aria-hidden="true" size={18} />
            : <Eye aria-hidden="true" size={18} />}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
