import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { createProfileIfMissing } from '../services/profileService';
import { settingsLoad, settingsUpdate } from '../services/settingsService';

const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [settings, setSettings] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settingsError, setSettingsError] = useState(null);

  async function updateSettings(changes) {
    if (!user) return null;
    const updatedSettings = await settingsUpdate(user.uid, changes, settings);
    setSettings(updatedSettings);
    return updatedSettings;
  }

  useEffect(() => {
    let active = true;
    let authRequestId = 0;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const requestId = ++authRequestId;

      setUser(currentUser);
      setProfile(null);
      setSettings(null);
      setProfileError(null);
      setSettingsError(null);

      if (!currentUser) {
        setLoading(false);
        setProfileLoading(false);
        setSettingsLoading(false);
        return;
      }

      setLoading(false);
      setProfileLoading(true);
      setSettingsLoading(true);

      void (async () => {
        try {
          const currentProfile = await createProfileIfMissing(currentUser);
          if (active && requestId === authRequestId) {
            setProfile(currentProfile);
          }
        } catch (error) {
          console.error("Profile loading failed:", error);
          if (active && requestId === authRequestId) {
            setProfileError(error);
          }
        } finally {
          if (active && requestId === authRequestId) {
            setProfileLoading(false);
          }
        }
      })();

      void (async () => {
        try {
          const userSettings = await settingsLoad(currentUser.uid);
          if (active && requestId === authRequestId) {
            setSettings(userSettings);
          }
        } catch (error) {
          console.error("Settings loading failed:", error);
          if (active && requestId === authRequestId) {
            setSettingsError(error);
          }
        } finally {
          if (active && requestId === authRequestId) {
            setSettingsLoading(false);
          }
        }
      })();
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    profile,
    loading,
    profileLoading,
    profileError,
    settings,
    settingsLoading,
    settingsError,
    isAuthenticated: user !== null,
    updateSettings,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export { AuthContext, AuthProvider };