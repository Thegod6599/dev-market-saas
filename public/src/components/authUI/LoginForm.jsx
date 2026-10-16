import styles from './LoginForm.module.css';
import GoogleIcon from '../../assets/icons/google-icon.svg?react';
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react';
import { loginWithEmail, loginWithGoogle, resetPassword } from '../../services/authService';
import {
  getAuthErrorMessage,
  getPasswordResetErrorMessage,
} from '../../utils/firebaseAuthErrors'
import { useLocation, useNavigate } from 'react-router-dom'

function LoginForm({ onSwitch, notice }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetSent, setResetSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;
    setError("");
    setIsSubmitting(true);
    try {
      await loginWithEmail(email, password);
      const destination = location.state?.from?.pathname || '/';
      navigate(destination, { replace: true, state: null });
    } catch (err) {
      console.error('Login error:', err)
      setError(getAuthErrorMessage(err))
      setPassword('');
      setShowPassword(false);
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleGoogleLogin() {
    setError("");
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error('Google login error:', err)
      setError(getAuthErrorMessage(err))
    } finally {
      setIsSubmitting(false);
      navigate('/');
    }
  }
  async function handlePasswordReset() {
    if (isSubmitting) return;
    setError('')
    setResetSent(false)

    if (!email.trim()) {
      setError('Please enter your email address')
      return;
    }
    setIsSubmitting(true)

    try {
      await resetPassword(email.trim())
      setResetSent(true)
    } catch (err) {
      setError(getPasswordResetErrorMessage(err))
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <>
      <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        {notice && <p className={styles.successMessage} role="status" data-testid="status-login-notice">{notice}</p>}
        <form onSubmit={handleSubmit} aria-busy={isSubmitting}>
          <div className={styles.inputContainer}>
          <label className={styles.fieldLabel} htmlFor="login-email">Email</label>
          <input id="login-email" name="email" type="email" placeholder="Email" autoComplete="email" className={styles.emailInput} value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} required data-testid="input-login-email"/>
          <label className={styles.fieldLabel} htmlFor="login-password">Password</label>
          <div className={styles.passwordContainer}>
          <input id="login-password" name="password" type={showPassword ? 'text' :'password'} placeholder="Password" autoComplete="current-password" className={styles.passwordInput} value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} required data-testid="input-login-password"/>
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle} disabled={isSubmitting}>
            {showPassword ? <EyeOff/> : <Eye/>}
          </button>
          </div>
            {resetSent && <p className={styles.successMessage} role="status" data-testid="status-password-reset">If an account exists for this email, password reset instructions have been sent.</p>}
            {error && <p className={styles.errorMessage} role="alert" data-testid="status-login-error">{error}</p>}
          </div>
          <div className={styles.loginActions}>
            <button type="submit" className={styles.loginButton} disabled={isSubmitting} data-testid="button-login">{isSubmitting ? 'Signing in…' : 'Login'}</button>
            <div className={styles.divider}/>
            <button type='button' className={styles.googleButton} onClick={handleGoogleLogin} disabled={isSubmitting} aria-label="Continue with Google">
              <GoogleIcon className={styles.googleIcon}/>
            </button>
          </div>
        </form>
        <div className={styles.loginExtras}>
          <button className={styles.forgotPassword} type="button" onClick={handlePasswordReset} disabled={isSubmitting} data-testid="button-forgot-password">
            {isSubmitting ? 'Please wait…' : 'Forgot password?'}
          </button>
          <p className={styles.switchText}>
            Don't have an account?{' '}
            <button type="button" onClick={onSwitch} disabled={isSubmitting}>Sign Up</button>
          </p>
        </div>
      </div>
      </div>
    </>
  )
}
export default LoginForm