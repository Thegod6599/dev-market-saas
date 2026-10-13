import { getIdTokenResult } from 'firebase/auth';
import { deleteCurrentUser, reauthenticateUserWithPassword } from './authService';
import { deleteProfile } from './profileService';
import { runAccountDeletion } from './accountDeletionFlow';

const MAX_RECENT_SIGN_IN_AGE_MS = 4 * 60 * 1000;

export const accountDeletionBlocker =
  'Full account deletion is paused: the app has no trusted Firebase UID-to-Supabase profile ID mapping, and current policies do not permit feedback-row deletion from this Firebase-only client. Nothing is deleted until a secure mapping and server cleanup route are configured.';

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
