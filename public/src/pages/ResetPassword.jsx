import styles from './pageStyles/ResetPassword.module.css';
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { confirmPasswordReset} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { Eye, EyeOff } from 'lucide-react'

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const oobCode = searchParams.get('oobCode');
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!oobCode) {
      setError('Invalid or expired reset link');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsSubmitting(true);
    try {
      await confirmPasswordReset(auth, oobCode, password);
      setPassword('');
      setConfirmPassword('');
      navigate('/login');
    } catch (err) {
      setError(error.message);
      if (err.code === "auth/expired-action-code") {
      setError("This password reset link has expired.");
    } else if (err.code === "auth/invalid-action-code") {
      setError("This password reset link is invalid.");
    } else if (err.code === "auth/weak-password") {
      setError("Password is too weak.");
    } else {
      setError("Unable to reset your password.");
    }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className={styles.resetContainer}>
        <div className={styles.resetForm}>
        <form onSubmit={handleSubmit}>
          <h2>Reset Password</h2>
          <div className={styles.inputContainer}>
            <div className={styles.passwordContainer}>
              <input type={showPassword ? 'text' :'password'} placeholder="Password" className={styles.passwordInput} value={password} onChange={(e) => setPassword(e.target.value)} required/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className={styles.passwordToggle} disabled={isSubmitting}>
                {showPassword ? <EyeOff/> : <Eye/>}
              </button>
              </div>
            <div className={styles.passwordContainer}>
              <input type={showConfirmedPassword ? 'text' :'password'} placeholder="Confirm Password" className={styles.passwordInput} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
              <button type="button" onClick={() => setShowConfirmedPassword(!showConfirmedPassword)} className={styles.passwordToggle} disabled={isSubmitting}>
                {showConfirmedPassword ? <EyeOff/> : <Eye/>}
              </button>
              </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button type="submit" className={styles.resetButton} disabled={isSubmitting}>Reset Password</button>
          </div>
        </form>
        </div>
      </div>
    </>
  )
}
export default ResetPassword;