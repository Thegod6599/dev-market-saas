import styles from './LoginForm.module.css';
import GoogleIcon from '../../assets/icons/google-icon.svg?react';
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react';
import { loginWithEmail, loginWithGoogle } from '../../services/authService';

function LoginForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await loginWithEmail(email, password);
    } catch (err) {
      console.error('Login error:', err)
      setError(err.code + ': ' + err.message)
    }  finally {
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
      setError(err.code + ': ' + err.message)
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <>
      <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
          <input type="email" placeholder="Email" className={styles.emailInput} value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <div className={styles.passwordContainer}>
          <input type={showPassword ? 'text' :'password'} placeholder="Password" className={styles.passwordInput} value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle}>
            {showPassword ? <EyeOff/> : <Eye/>}
          </button>
          </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
          </div>
          <div className={styles.loginActions}>
            <button type="submit" className={styles.loginButton} disabled={isSubmitting}>Login</button>
            <div className={styles.divider}/>
            <button type='button' className={styles.googleButton} onClick={handleGoogleLogin} disabled={isSubmitting}>
              <GoogleIcon className={styles.googleIcon}/>
            </button>
          </div>
        </form>
        <div className={styles.loginExtras}>
        <p className={styles.forgotPassword}>Forgot Password?</p>
        <p className={styles.switchText}>Don't have an account? <span onClick={onSwitch}>Sign Up</span></p>
        </div>
      </div>
      </div>
    </>
  )
}
export default LoginForm