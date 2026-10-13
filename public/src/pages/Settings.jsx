import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';
import PasswordField from '../components/authUI/PasswordField';
import { useAuth } from '../hooks/useAuth';
import {
  logout as logoutUser,
  updateUserEmail,
  updateUserPassword,
} from '../services/authService';
import {
  accountDeletionBlocker,
  deleteAccountAndOwnedData,
  hasPasswordAuthentication,
} from '../services/accountDeletionService';
import {
  getAccountDeletionErrorMessage,
  getAccountSettingsErrorMessage,
  getPasswordChangeErrorMessage,
} from '../utils/firebaseAuthErrors';
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
  const [currentEmail, setCurrentEmail] = useState(user?.email || '');
  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [deleteCurrentPassword, setDeleteCurrentPassword] = useState('');
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteProgress, setDeleteProgress] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const supportsPasswordAuth = hasPasswordAuthentication(user);

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

  async function handleEmailChange(event) {
    event.preventDefault();
    if (isUpdatingEmail || !user) return;

    setEmailError('');
    setEmailStatus('');
    const nextEmail = newEmail.trim();
    if (!nextEmail) {
      setEmailError('Enter the new email address.');
      return;
    }
    if (nextEmail.toLowerCase() === currentEmail.trim().toLowerCase()) {
      setEmailError('Enter an email address that is different from your current one.');
      return;
    }
    if (nextEmail.toLowerCase() !== confirmEmail.trim().toLowerCase()) {
      setEmailError('The email addresses do not match.');
      return;
    }

    setIsUpdatingEmail(true);
    try {
      await updateUserEmail(user, nextEmail);
      setCurrentEmail(nextEmail);
      setNewEmail('');
      setConfirmEmail('');
      setEmailStatus('Your account email has been updated.');
    } catch (error) {
      setEmailError(getAccountSettingsErrorMessage(error));
    } finally {
      setIsUpdatingEmail(false);
    }
  }

  function cancelDeleteConfirmation() {
    setShowDeleteConfirmation(false);
    setDeleteConfirmation('');
    setDeleteCurrentPassword('');
    setDeleteProgress('');
    setDeleteError('');
  }

  async function handleDeleteAccount(event) {
    event.preventDefault();
    if (isDeletingAccount || !user || deleteConfirmation !== 'DELETE') return;

    setDeleteError('');
    setDeleteProgress('');
    setIsDeletingAccount(true);
    try {
      await deleteAccountAndOwnedData(
        user,
        deleteCurrentPassword,
        setDeleteProgress,
      );
      navigate('/login', {
        replace: true,
        state: { notice: 'Your Firebase account and Firestore profile/settings were deleted.' },
      });
    } catch (error) {
      setDeleteError(getAccountDeletionErrorMessage(error));
      setDeleteProgress('');
    } finally {
      setIsDeletingAccount(false);
    }
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

      <section className={styles.settingsCard} aria-labelledby="change-email-title">
        <div className={styles.sectionHeading}>
          <h2 id="change-email-title">Change email</h2>
          <p>Current email: {currentEmail || 'Not available'}</p>
        </div>
        <form className={styles.accountForm} onSubmit={handleEmailChange} aria-busy={isUpdatingEmail}>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="settings-new-email">New email address</label>
            <input
              className={styles.textInput}
              id="settings-new-email"
              name="newEmail"
              type="email"
              autoComplete="email"
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
              required
              disabled={isUpdatingEmail}
              data-testid="input-settings-new-email"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel} htmlFor="settings-confirm-email">Confirm new email address</label>
            <input
              className={styles.textInput}
              id="settings-confirm-email"
              name="confirmEmail"
              type="email"
              autoComplete="off"
              value={confirmEmail}
              onChange={(event) => setConfirmEmail(event.target.value)}
              required
              disabled={isUpdatingEmail}
              data-testid="input-settings-confirm-email"
            />
          </div>
          {emailError && <p className={styles.errorMessage} role="alert" data-testid="status-email-change-error">{emailError}</p>}
          {emailStatus && <p className={styles.successMessage} role="status" data-testid="status-email-change-success">{emailStatus}</p>}
          <button
            className={styles.primaryButton}
            type="submit"
            disabled={isUpdatingEmail}
            data-testid="button-save-email"
          >
            {isUpdatingEmail ? 'Updating email…' : 'Update email'}
          </button>
        </form>
      </section>

      <section className={`${styles.settingsCard} ${styles.dangerCard}`} aria-labelledby="delete-account-title">
        <div className={styles.sectionHeading}>
          <h2 id="delete-account-title">Delete account</h2>
          <p>Account deletion is permanent and must remove every user-owned record before sign-in is deleted.</p>
        </div>
        <p className={styles.deletionNotice} role="note" data-testid="text-delete-account-data-scope">
          The app also stores feedback rows in Supabase. Its current policies do not permit deleting those rows
          from this Firebase-only client, and no trusted mapping from Firebase UID to the Supabase profile ID is
          established. Full account deletion is paused rather than leaving records behind. Shared Supabase
          library records are never deleted. Provider-managed logs and backups may follow separate retention periods.
        </p>
        <p className={styles.errorMessage} role="note" data-testid="text-delete-account-blocker">
          {accountDeletionBlocker}
        </p>

        {!showDeleteConfirmation && (
          <button
            className={styles.dangerButton}
            type="button"
            onClick={() => {
              setDeleteError('');
              setShowDeleteConfirmation(true);
            }}
            disabled={Boolean(accountDeletionBlocker)}
            data-testid="button-start-account-deletion"
          >
            Delete account (unavailable)
          </button>
        )}

        {showDeleteConfirmation && (
          <form
            className={styles.deleteConfirmation}
            onSubmit={handleDeleteAccount}
            aria-busy={isDeletingAccount}
            aria-labelledby="delete-confirmation-title"
          >
            <h3 id="delete-confirmation-title">Confirm account deletion</h3>
            <p>To continue, type <strong>DELETE</strong> below. This action cannot be undone.</p>
            {supportsPasswordAuth ? (
              <PasswordField
                id="settings-delete-current-password"
                label="Current password"
                value={deleteCurrentPassword}
                onChange={(event) => setDeleteCurrentPassword(event.target.value)}
                autoComplete="current-password"
                minLength={1}
                disabled={isDeletingAccount}
                testId="input-delete-current-password"
              />
            ) : (
              <p className={styles.infoMessage}>
                Deletion requires a recent sign-in for this account. If this session is too old, sign out and
                sign in again with your existing method before retrying. This form will not start another sign-in flow.
              </p>
            )}
            <div className={styles.fieldGroup}>
              <label className={styles.fieldLabel} htmlFor="delete-account-confirmation">Type DELETE to confirm</label>
              <input
                className={styles.textInput}
                id="delete-account-confirmation"
                name="deleteConfirmation"
                type="text"
                autoComplete="off"
                value={deleteConfirmation}
                onChange={(event) => setDeleteConfirmation(event.target.value)}
                disabled={isDeletingAccount}
                data-testid="input-delete-account-confirmation"
              />
            </div>
            {deleteProgress && (
              <p className={styles.statusMessage} role="status" data-testid="status-delete-account-progress">
                {deleteProgress === 'reauthentication' && 'Verifying your sign-in…'}
                {deleteProgress === 'supabase-feedback' && 'Removing your Supabase feedback…'}
                {deleteProgress === 'firestore' && 'Removing your Firestore profile and settings…'}
                {deleteProgress === 'firebase-auth' && 'Deleting your Firebase sign-in account…'}
              </p>
            )}
            {deleteError && <p className={styles.errorMessage} role="alert" data-testid="status-delete-account-error">{deleteError}</p>}
            <div className={styles.buttonRow}>
              <button
                className={styles.dangerButton}
                type="submit"
                disabled={Boolean(accountDeletionBlocker) || isDeletingAccount || deleteConfirmation !== 'DELETE'}
                data-testid="button-confirm-account-deletion"
              >
                {isDeletingAccount ? 'Deleting account data…' : 'Permanently delete account'}
              </button>
              <button
                className={styles.textButton}
                type="button"
                onClick={cancelDeleteConfirmation}
                disabled={isDeletingAccount}
                data-testid="button-cancel-account-deletion"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      <section className={styles.settingsCard} aria-labelledby="support-legal-title">
        <div className={styles.sectionHeading}>
          <h2 id="support-legal-title">Support and legal</h2>
          <p>These destinations are not available yet.</p>
        </div>
        <ul className={styles.unavailableList}>
          <li><span>Support</span><span>Coming soon</span></li>
          <li><span>Privacy Policy</span><span>Coming soon</span></li>
          <li><span>Terms of Service</span><span>Coming soon</span></li>
        </ul>
      </section>
    </main>
  );
}

export default Settings;
