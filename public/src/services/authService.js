import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  updateEmail,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
const googleProvider = new GoogleAuthProvider()

export async function loginWithEmail(email, password) {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}
export async function signupWithEmail(email, password, photoURL = "") {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  if (photoURL.trim()) {
    await updateProfile(result.user, {
      photoURL: photoURL.trim(),
    });
  }

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
  await sendPasswordResetEmail(auth, email);
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
