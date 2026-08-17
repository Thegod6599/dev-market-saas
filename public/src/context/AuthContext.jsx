import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { createProfileIfMissing } from '../services/profileService';

const AuthContext = createContext(null);
function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true)
   const [profile, setProfile] = useState(null)
   useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
       setUser(currentUser);
       if (currentUser) {
         const currentProfile = await createProfileIfMissing(currentUser);
         setProfile(currentProfile)
       } else {
         setProfile(null);
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
   };
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export { AuthContext, AuthProvider };