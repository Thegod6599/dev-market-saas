import styles from './SignupForm.module.css';
import GoogleIcon from '../../assets/icons/google-icon.svg?react';
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react';
import { signupWithEmail, loginWithGoogle } from '../../services/authService';
import { getAuthErrorMessage } from '../../utils/firebaseAuthErrors'
import { useNavigate } from 'react-router-dom';

function SignupForm({ onSwitch }) {
  const navigate = useNavigate()
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
      await signupWithEmail(email, password)
    } catch (err) {
      console.error('Signup error:', err)
      setError(getAuthErrorMessage(err))
    } finally {
      setIsSubmitting(false);
      setPassword('')
      setEmail('')
      setShowPassword(false)
      navigate('/')
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
      navigate('/')
    }
  }
  
  return (
    <>
      <div className={styles.signupContainer}>
      <div className={styles.signupForm}>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
          <input type="email" placeholder="Email" className={styles.emailInput} value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <div className={styles.passwordContainer}>
          <input type={showPassword ? 'text' :'password'} placeholder="Password" className={styles.passwordInput} value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle} disabled={isSubmitting}>
            {showPassword ? <EyeOff/> : <Eye/>}
          </button>
          </div>
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <div className={styles.signupActions}>
            <button type="submit" className={styles.signupButton} disabled={isSubmitting}>Sign Up</button>
            <div className={styles.divider}/>
            <button type='button' className={styles.googleButton} onClick={handleGoogleLogin} disabled={isSubmitting}>
              <GoogleIcon className={styles.googleIcon}/>
            </button>
          </div>
        </form>
        <div className={styles.signupExtras}>
        <p className={styles.switchText}>Already have an account? <span onClick={onSwitch}>Login</span></p>
        </div>
      </div>
      </div>
    </>
  )
}
export default SignupForm