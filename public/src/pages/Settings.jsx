import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';
import PasswordField from '../components/authUI/PasswordField';
import { useAuth } from '../hooks/useAuth';
import { logout as logoutUser, updateUserPassword } from '../services/authService';
import { getPasswordChangeErrorMessage } from '../utils/firebaseAuthErrors';
import styles from './pageStyles/Settings.module.css';

function Settings() {
  const navigate = useNavigate();
  const {
    user,
    settings,
    settingsLoading,
    settingsError,
    updateSettings,
  } = useAuth();
  const [isSavingTheme, setIsSavingTheme] = useState(false);
  const [themeStatus, setThemeStatus] = useState('');
  const [themeError, setThemeError] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  const supportsPasswordAuth = user?.providerData?.some(
    (provider) => provider.providerId === 'password',
  );

  useEffect(() => {
    if (settingsLoading || !settings?.theme) return undefined;

    const theme = settings.theme;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };

    applyTheme();
    if (theme !== 'system') return undefined;

    mediaQuery.addEventListener('change', applyTheme);
    return () => mediaQuery.removeEventListener('change', applyTheme);
  }, [settings?.theme, settingsLoading]);

  async function handleThemeChange(event) {
    if (isSavingTheme || !settings) return;
    const theme = event.target.value;
    setThemeError('');
    setThemeStatus('');
    setIsSavingTheme(true);

    try {
      await updateSettings({ theme });
      setThemeStatus('Theme preference saved.');
    } catch {
      setThemeError('Your theme preference could not be saved. Please try again.');
    } finally {
      setIsSavingTheme(false);
    }
  }

  async function handlePasswordChange(event) {
    event.preventDefault();
    if (isSavingPassword) return;
    setPasswordError('');
    setPasswordStatus('');

    if (newPassword.length < 6) {
      setPasswordError('Choose a new password with at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('The new passwords do not match.');
      return;
    }
    if (newPassword === currentPassword) {
      setPasswordError('Choose a new password that is different from your current password.');
      return;
    }

    setIsSavingPassword(true);
    try {
      await updateUserPassword(user, currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsChangingPassword(false);
      setPasswordStatus('Your password has been updated.');
    } catch (error) {
      setPasswordError(getPasswordChangeErrorMessage(error));
    } finally {
      setIsSavingPassword(false);
    }
  }

  function closePasswordForm() {
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  }

  async function handleLogout() {
    if (isLoggingOut) return;
    setLogoutError('');
    setIsLoggingOut(true);
    try {
      await logoutUser();
      navigate('/login', {
        replace: true,
        state: { notice: 'You have been signed out.' },
      });
    } catch {
      setLogoutError('You could not be signed out. Please try again.');
      setIsLoggingOut(false);
    }
  }

  return (
    <main className={styles.settingsPage}>
      <header className={styles.pageHeader}>
        <button
          className={styles.backButton}
          type="button"
          onClick={() => navigate('/')}
          aria-label="Back to home"
          data-testid="button-settings-back"
        >
          <ArrowLeft aria-hidden="true" size={18} />
          <span>Back</span>
        </button>
        <div>
          <p className={styles.eyebrow}>Account</p>
          <h1>Settings</h1>
          <p className={styles.pageDescription}>Manage your preferences and password.</p>
        </div>
      </header>

      <section className={styles.settingsCard} aria-labelledby="appearance-title">
        <div className={styles.sectionHeading}>
          <h2 id="appearance-title">Appearance</h2>
          <p>Your theme preference is saved to your account.</p>
        </div>

        {settingsLoading && (
          <p className={styles.statusMessage} role="status" data-testid="status-settings-loading">
            Loading your preferences…
          </p>
        )}
        {!settingsLoading && settingsError && (
          <p className={styles.errorMessage} role="alert" data-testid="status-settings-load-error">
            Your preferences could not be loaded. Refresh the page to try again.
          </p>
        )}
        {!settingsLoading && !settingsError && settings && (
          <div className={styles.settingRow}>
            <label htmlFor="theme-preference">Theme</label>
            <select
              id="theme-preference"
              className={styles.themeSelect}
              value={settings.theme}
              onChange={handleThemeChange}
              disabled={isSavingTheme}
              aria-busy={isSavingTheme}
              data-testid="select-theme"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        )}
        {isSavingTheme && <p className={styles.statusMessage} role="status">Saving theme preference…</p>}
        {themeStatus && <p className={styles.successMessage} role="status" data-testid="status-theme-saved">{themeStatus}</p>}
        {themeError && <p className={styles.errorMessage} role="alert" data-testid="status-theme-error">{themeError}</p>}
      </section>

      <section className={styles.settingsCard} aria-labelledby="account-title">
        <div className={styles.sectionHeading}>
          <h2 id="account-title">Account</h2>
          <p>{user?.email || 'Signed-in account'}</p>
        </div>

        {passwordStatus && <p className={styles.successMessage} role="status" data-testid="status-password-updated">{passwordStatus}</p>}
        {supportsPasswordAuth && !isChangingPassword && (
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={() => {
              setPasswordStatus('');
              setPasswordError('');
              setIsChangingPassword(true);
            }}
            data-testid="button-change-password"
          >
            Change password
          </button>
        )}
        {!supportsPasswordAuth && (
          <p className={styles.infoMessage} data-testid="text-password-change-unavailable">
            Password changes are available for email/password accounts.
          </p>
        )}

        {isChangingPassword && (
          <form className={styles.passwordForm} onSubmit={handlePasswordChange} aria-busy={isSavingPassword}>
            <PasswordField
              id="settings-current-password"
              label="Current password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              autoComplete="current-password"
              minLength={1}
              disabled={isSavingPassword}
              testId="input-settings-current-password"
            />
            <PasswordField
              id="settings-new-password"
              label="New password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              autoComplete="new-password"
              disabled={isSavingPassword}
              testId="input-settings-new-password"
            />
            <PasswordField
              id="settings-confirm-password"
              label="Confirm new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              disabled={isSavingPassword}
              testId="input-settings-confirm-password"
            />
            <p className={styles.passwordHint}>Use at least 6 characters.</p>
            {passwordError && <p className={styles.errorMessage} role="alert" data-testid="status-password-change-error">{passwordError}</p>}
            <div className={styles.buttonRow}>
              <button
                className={styles.primaryButton}
                type="submit"
                disabled={isSavingPassword}
                data-testid="button-save-password"
              >
                {isSavingPassword ? 'Updating password…' : 'Update password'}
              </button>
              <button
                className={styles.textButton}
                type="button"
                onClick={closePasswordForm}
                disabled={isSavingPassword}
                data-testid="button-cancel-password"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {passwordError && !isChangingPassword && (
          <p className={styles.errorMessage} role="alert" data-testid="status-password-change-error">
            {passwordError}
          </p>
        )}

        <div className={styles.logoutArea}>
          {logoutError && <p className={styles.errorMessage} role="alert" data-testid="status-logout-error">{logoutError}</p>}
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            aria-busy={isLoggingOut}
            data-testid="button-logout"
          >
            <LogOut aria-hidden="true" size={17} />
            {isLoggingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </section>

      <section className={styles.settingsCard} aria-labelledby="availability-title">
        <div className={styles.sectionHeading}>
          <h2 id="availability-title">Other account options</h2>
          <p>Change email, account deletion, support, and policy pages are not available in this release.</p>
        </div>
      </section>
    </main>
  );
}

export default Settings;
