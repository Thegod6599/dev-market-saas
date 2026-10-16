import { getIdTokenResult } from 'firebase/auth';
import { deleteCurrentUser, reauthenticateUserWithPassword } from './authService';
import { runAccountDeletion } from './accountDeletionFlow';
import { deleteUserData } from './userDataCleanupService';

const MAX_RECENT_SIGN_IN_AGE_MS = 4 * 60 * 1000;

export function hasPasswordAuthentication(user) {
  return Boolean(user?.providerData?.some((provider) => provider.providerId === 'password'));
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
    deleteUserData,
    deleteFirebaseAccount: deleteCurrentUser,
    onProgress,
  });
}
