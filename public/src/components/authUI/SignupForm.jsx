import styles from './SignupForm.module.css';
import GoogleIcon from '../../assets/icons/google-icon.svg?react';
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react';
import { signupWithEmail, loginWithGoogle } from '../../services/authService';
import { getAuthErrorMessage } from '../../utils/firebaseAuthErrors'
import { useLocation, useNavigate, Link } from 'react-router-dom';

function SignupForm({ onSwitch }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const destination = location.state?.from?.pathname || '/';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy to continue.');
      return;
    }

    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);
    try {
      await signupWithEmail(email, password)
      navigate(destination, { replace: true, state: null });
    } catch (err) {
      console.error('Signup error:', err)
      setError(getAuthErrorMessage(err))
      setPassword('');
      setShowPassword(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy to continue.');
      return;
    }
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      navigate(destination, { replace: true, state: null });
    } catch (err) {
      console.error('Google login error:', err)
      setError(getAuthErrorMessage(err))
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className={styles.signupContainer}>
      <div className={styles.signupForm}>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
          <div className={styles.inputContainer}>
          <label className={styles.fieldLabel} htmlFor="signup-email">Email</label>
          <input id="signup-email" name="email" type="email" placeholder="Email" autoComplete="email" className={styles.emailInput} value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} required data-testid="input-signup-email"/>
          <label className={styles.fieldLabel} htmlFor="signup-password">Password</label>
          <div className={styles.passwordContainer}>
          <input id="signup-password" name="password" type={showPassword ? 'text' :'password'} placeholder="Password" autoComplete="new-password" className={styles.passwordInput} value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} required data-testid="input-signup-password"/>
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle} disabled={isSubmitting}>
            {showPassword ? <EyeOff/> : <Eye/>}
          </button>
          </div>
          </div>
          <div className={styles.agreementRow}>
            <input
              id="signup-agreement"
              name="agreement"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              disabled={isSubmitting}
              required
              data-testid="checkbox-signup-agreement"
            />
            <label htmlFor="signup-agreement">
              I agree to the{' '}
              <Link to="/terms-of-service">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy">
                Privacy Policy
              </Link>.
            </label>
          </div>

          {error && <p className={styles.errorMessage} role="alert" data-testid="status-signup-error">{error}</p>}
          <div className={styles.signupActions}>
            <button type="submit" className={styles.signupButton} disabled={isSubmitting} data-testid="button-signup">{isSubmitting ? 'Creating account…' : 'Sign Up'}</button>
            <div className={styles.divider}/>
            <button type='button' className={styles.googleButton} onClick={handleGoogleLogin} disabled={isSubmitting} aria-label="Continue with Google">
              <GoogleIcon className={styles.googleIcon}/>
            </button>
          </div>
        </form>
        <div className={styles.signupExtras}>
        <p className={styles.switchText}>
          Already have an account?{' '}
          <button type="button" onClick={onSwitch} disabled={isSubmitting}>Login</button>
        </p>
        </div>
      </div>
      </div>
    </>
  )
}
export default SignupForm