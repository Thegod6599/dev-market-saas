import styles from './LoginForm.module.css';
import GoogleIcon from '../../assets/google-icon.svg?react';
import { useState } from 'react';

function LoginForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email"/>
          <div className={styles.passwordContainer}>
          <input type={showPassword ? 'text' :'password'} placeholder="Password" className={styles.passwordInput}/>
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          </div>
          <button type="submit">Login</button>
        </form>
        <button type='button' className={styles.googleButton}>
          <GoogleIcon className={styles.googleIcon}/>
        </button>
        <p className={styles.forgotPassword}>Forgot Password?</p>
        <p className={styles.switchText}>Don't have an account? <span onClick={onSwitch}>Sign Up</span></p>
      </div>
    </>
  )
}
export default LoginForm