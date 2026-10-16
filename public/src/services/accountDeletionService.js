import { getIdTokenResult } from 'firebase/auth';
import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { auth } from '../firebase/firebase';
import { deleteCurrentUser, reauthenticateUserWithPassword } from './authService';
import { deleteProfile } from './profileService';
import { runAccountDeletion } from './accountDeletionFlow';

const MAX_RECENT_SIGN_IN_AGE_MS = 4 * 60 * 1000;

export function hasPasswordAuthentication(user) {
  return Boolean(user?.providerData?.some((provider) => provider.providerId === 'password'));
}

async function deleteOwnedFeedback(uid) {
  const feedbackQuery = query(
    collection(db, 'feedback'),
    where('userId', '==', uid),
  );
  const snapshot = await getDocs(feedbackQuery);
  const docs = snapshot.docs;
  const batchSize = 450;

  for (let index = 0; index < docs.length; index += batchSize) {
    const batch = writeBatch(db);
    docs.slice(index, index + batchSize).forEach((feedbackDoc) => {
      batch.delete(feedbackDoc.ref);
    });
    await batch.commit();
  }
}

async function deleteOwnedFirestoreData(uid) {
  // Remove user-owned feedback first; retain the profile until cleanup finishes.
  await deleteOwnedFeedback(uid);
  await deleteProfile(uid);
}

async function verifyRecentSignIn(user) {
  const tokenResult = await getIdTokenResult(user, true);
  const authTime = Date.parse(tokenResult.authTime);
  const age = Date.now() - authTime;

  if (!Number.isFinite(authTime) || age < -60_000 || age > MAX_RECENT_SIGN_IN_AGE_MS) {
    const error = new Error('A recent sign-in is required to delete this account.');
    error.code = 'auth/requires-recent-login';
    throw error;
  }
}

export function deleteAccountAndOwnedData(user, currentPassword, onProgress) {
  return runAccountDeletion({
    user,
    currentPassword,
    passwordAuthentication: hasPasswordAuthentication(user),
    reauthenticate: reauthenticateUserWithPassword,
    verifyRecentSignIn,
    deleteFirestoreProfile: deleteOwnedFirestoreData,
    deleteFirebaseAccount: deleteCurrentUser,
    onProgress,
  });
}
