import styles from './LoginForm.module.css';
import GoogleIcon from '../../assets/icons/google-icon.svg?react';
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react';

function LoginForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <>
      <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form>
          <div className={styles.inputContainer}>
          <input type="email" placeholder="Email" className={styles.emailInput} required/>
          <div className={styles.passwordContainer}>
          <input type={showPassword ? 'text' :'password'} placeholder="Password" className={styles.passwordInput} required/>
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle}>
            {showPassword ? <EyeOff/> : <Eye/>}
          </button>
          </div>
          </div>
          <div className={styles.loginActions}>
            <button type="submit" className={styles.loginButton}>Login</button>
            <div className={styles.divider}/>
            <button type='button' className={styles.googleButton}>
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