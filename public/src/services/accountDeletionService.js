import { getIdTokenResult } from 'firebase/auth';
import { deleteCurrentUser, reauthenticateUserWithPassword } from './authService';
import { deleteProfile } from './profileService';
import { runAccountDeletion } from './accountDeletionFlow';

const MAX_RECENT_SIGN_IN_AGE_MS = 4 * 60 * 1000;

export const accountDeletionBlocker =
  'Full account deletion is paused until a trusted server-side path can remove this user’s Supabase feedback rows. The current Supabase policies do not allow deletion, and this app has no Supabase-authenticated session.';

export function hasPasswordAuthentication(user) {
  return Boolean(user?.providerData?.some((provider) => provider.providerId === 'password'));
}

async function deleteSupabaseFeedback() {
  const error = new Error('Secure Supabase feedback deletion is not configured.');
  error.code = 'account/supabase-feedback-cleanup-unavailable';
  throw error;
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
    deleteSupabaseFeedback,
    deleteFirestoreProfile: deleteProfile,
    deleteFirebaseAccount: deleteCurrentUser,
    onProgress,
  });
}
