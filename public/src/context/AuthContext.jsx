import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { createProfileIfMissing } from '../services/profileService';
import { settingsLoad, settingsUpdate } from '../services/settingsService';

const AuthContext = createContext(null);
function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true)
   const [profile, setProfile] = useState(null)
   const [settings, setSettings] = useState(null)
  async function updateSettings(changes) {
    if (!user) return;
    const updatedSettings = await settingsUpdate(user.uid, changes);
    setSettings(updatedSettings);
  }
   useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
       setUser(currentUser);
       if (currentUser) {
         const currentProfile = await createProfileIfMissing(currentUser);
         const userSettings = await settingsLoad(currentUser.uid);
         setSettings(userSettings)
         setProfile(currentProfile)
       } else {
         setProfile(null);
         setSettings(null);
       }
       setLoading(false);
     });
     return unsubscribe
   }, [])
   const value = {
     user,
     profile,
     loading,
     isAuthenticated: user !== null,
     settings,
     updateSettings,
   };
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export { AuthContext, AuthProvider };