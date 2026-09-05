import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function createProfile(user) {
  const userRef = doc(db, "users", user.uid);
  const profile = {
    displayName: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
  };

  await setDoc(userRef, {
    ...profile,
    createdAt: serverTimestamp(),
  }, { merge: true });

  return profile;
}
export async function getProfile(uid) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }
  return snapshot.data()
}
export async function updateProfile(uid, updates) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, updates);
}
export async function deleteProfile(uid) {
  const userRef = doc(db, "users", uid);
  await deleteDoc(userRef);
}
export async function createProfileIfMissing(user) {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);
  const existingProfile = snapshot.exists() ? snapshot.data() : {};
  const profile = {
    displayName: user.displayName || existingProfile.displayName || "",
    email: user.email || existingProfile.email || "",
    photoURL: user.photoURL || existingProfile.photoURL || "",
  };

  const profileChanged = Object.entries(profile).some(
    ([key, value]) => existingProfile[key] !== value,
  );

  if (!snapshot.exists() || profileChanged) {
    await setDoc(userRef, {
      ...profile,
      ...(!snapshot.exists() ? { createdAt: serverTimestamp() } : {}),
    }, { merge: true });
  }

  return { ...existingProfile, ...profile };
}