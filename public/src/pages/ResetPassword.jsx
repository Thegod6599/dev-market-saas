import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import PasswordField from '../components/authUI/PasswordField';
import { getPasswordResetErrorMessage } from '../utils/firebaseAuthErrors';
import styles from './pageStyles/ResetPassword.module.css';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [codeError, setCodeError] = useState('');
  const [formError, setFormError] = useState('');
  const [isCheckingCode, setIsCheckingCode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mode = searchParams.get('mode');
  const oobCode = searchParams.get('oobCode');

  useEffect(() => {
    let isMounted = true;

    if (mode !== 'resetPassword' || !oobCode) {
      setCodeError('This reset link is missing or invalid. Request a new reset email from the login page.');
      setIsCheckingCode(false);
      return () => {
        isMounted = false;
      };
    }

    setIsCheckingCode(true);
    setCodeError('');
    verifyPasswordResetCode(auth, oobCode)
      .then(() => {
        if (isMounted) setIsCheckingCode(false);
      })
      .catch((verificationError) => {
        if (!isMounted) return;
        setCodeError(getPasswordResetErrorMessage(verificationError));
        setIsCheckingCode(false);
      });

    return () => {
      isMounted = false;
    };
  }, [mode, oobCode]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (isSubmitting || isCheckingCode || !oobCode) return;
    setFormError('');

    if (password.length < 6) {
      setFormError('Choose a password with at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('The passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setPassword('');
      setConfirmPassword('');
      navigate('/login', {
        replace: true,
        state: { notice: 'Your password has been updated. Sign in with your new password.' },
      });
    } catch (resetError) {
      const message = getPasswordResetErrorMessage(resetError);
      if (
        resetError?.code === 'auth/expired-action-code'
        || resetError?.code === 'auth/invalid-action-code'
      ) {
        setCodeError(message);
      } else {
        setFormError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className={styles.resetContainer}>
      <section className={styles.resetCard} aria-labelledby="reset-password-title">
        <p className={styles.eyebrow}>Account security</p>
        <h1 id="reset-password-title">Reset your password</h1>
        <p className={styles.description}>
          Choose a new password for your account.
        </p>

        {isCheckingCode && (
          <p className={styles.statusMessage} role="status" data-testid="status-reset-checking">
            Checking your reset link…
          </p>
        )}

        {!isCheckingCode && codeError && (
          <div className={styles.feedbackError} role="alert" data-testid="status-reset-error">
            <p>{codeError}</p>
            <Link to="/login">Return to login to request another reset email</Link>
          </div>
        )}

        {!isCheckingCode && !codeError && (
          <form className={styles.resetForm} onSubmit={handleSubmit} aria-busy={isSubmitting}>
            <PasswordField
              id="reset-new-password"
              label="New password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              disabled={isSubmitting}
              testId="input-reset-new-password"
            />
            <PasswordField
              id="reset-confirm-password"
              label="Confirm new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              disabled={isSubmitting}
              testId="input-reset-confirm-password"
            />
            <p className={styles.passwordHint}>Use at least 6 characters.</p>
            {formError && <p className={styles.feedbackError} role="alert" data-testid="status-reset-form-error">{formError}</p>}
            <button
              className={styles.submitButton}
              type="submit"
              disabled={isSubmitting}
              data-testid="button-reset-password"
            >
              {isSubmitting ? 'Updating password…' : 'Update password'}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

export default ResetPassword;