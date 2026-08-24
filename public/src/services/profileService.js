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
  await setDoc(userRef, {
    displayName: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    createdAt: serverTimestamp(),
  })
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
  const existingProfile = await getProfile(user.uid);
  if (!existingProfile) {
    await createProfile(user);
    return await getProfile(user.uid);
  }
  return existingProfile;
}