import { useNavigate } from "react-router-dom";
import { ArrowLeft } from 'lucide-react';
import styles from './pageStyles/Settings.module.css';

function Settings() {
  const navigate = useNavigate()
  return(
    <>
      <div className={styles.settingsPage}>
      <button onClick={() => {navigate('/')}} className={styles.backButton}><ArrowLeft/>Back</button>

      <section className={styles.appearanceSection}>
        <h2>Appearance</h2>
        <p>Customize how DevMarket looks</p>
        <div className={styles.appearanceBox}>
          <div className={styles.themeSettings}>
            <h3>Theme</h3>
            <select>
              <option value='system'>System</option>
              <option value='light'>Light</option>
              <option value='dark'>Dark</option>
            </select>
          </div>
        </div>
      </section>

      <section className={styles.accountSection}>
        <h2>Account</h2>
        <p>Manage your DevMarket account</p>
        <div className={styles.accountBox}>
          <div className={styles.passwordSettings}>
            <button>Change Password</button>
          </div>
          <div className={styles.emailSettings}>
            <button>Change Email</button>
          </div>
          <div className={styles.logoutButton}>
            <button>Logout</button>
          </div>
        </div>
      </section>

      <section className={styles.dangerZone}>
        <h2>Danger Zone</h2>
        <p>Manage permanent account action</p>
        <div className={styles.dangerZoneBox}>
          <div className={styles.deleteAccountButton}>
            <button>Delete Account</button>
          </div>
        </div>
      </section>

      <section className={styles.supportSection}>
        <h2>Support & About</h2>
        <p>Send feedback, or get support</p>
        <div className={styles.supportBox}>
          <div className={styles.feedback}>
            <a>Feedback</a>
          </div>
          <div className={styles.support}>
            <a>Support & Help</a>
          </div>
          <div className={styles.privacyPolicy}>
            <a>Privacy Policy</a>
          </div>
          <div className={styles.termsOfService}>
            <a>Terms of Service</a>
          </div>
          <div className={styles.version}>
            <p>V 1.0.0</p>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
export default Settings