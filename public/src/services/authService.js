import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
const googleProvider = new GoogleAuthProvider()

export async function loginWithEmail(email, password) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}
export async function signupWithEmail(email, password) {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}
export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}
export async function logout() {
  await signOut(auth);
}
export async function resetPassword(email) {
  const actionCodeSettings = {
    url: 'https://ad5aa687-dba1-44b3-aa8e-400c86bb2e45-00-3nlcztdb1ldiw.spock.replit.dev/reset-password',
    handleCodeInApp: true,
  }
  await sendPasswordResetEmail(auth, email, actionCodeSettings);
}
export async function updateUserPassword(user, newPassword) {
  if (!user) throw new Error("No user is currently signed in.");
  await updatePassword(user, newPassword);
}
export async function updateUserEmail(user, newEmail) {
  if (!user) throw new Error("No user is currently signed in.");
  await updateEmail(user, newEmail);
}
export async function deleteCurrentUser(user) {
  if (!user) throw new Error("No user is currently signed in.");
  await deleteUser(user);
}
