import styles from './SignupForm.module.css';
import GoogleIcon from '../../assets/icons/google-icon.svg?react';
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react';

function SignupForm({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <>
      <div className={styles.signupContainer}>
      <div className={styles.signupForm}>
        <h2>Signup</h2>
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
          <div className={styles.signupActions}>
            <button type="submit" className={styles.signupButton}>Sign Up</button>
            <div className={styles.divider}/>
            <button type='button' className={styles.googleButton}>
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