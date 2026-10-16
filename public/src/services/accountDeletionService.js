import { getIdTokenResult } from 'firebase/auth';
import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { deleteCurrentUser, reauthenticateUserWithPassword } from './authService';
import { deleteProfile } from './profileService';
import { runAccountDeletion } from './accountDeletionFlow';

const MAX_RECENT_SIGN_IN_AGE_MS = 4 * 60 * 1000;

export function hasPasswordAuthentication(user) {
  return Boolean(user?.providerData?.some((provider) => provider.providerId === 'password'));
}

async function deleteAndVerifySupabaseRows(table, ownerColumn, uid, selectedColumn = 'id') {
  const deletion = await supabase.from(table).delete().eq(ownerColumn, uid);
  if (deletion.error) {
    throw Object.assign(new Error(`Could not delete owned ${table} records.`), {
      code: deletion.error.code || 'supabase/delete-failed',
      table,
    });
  }

  const remaining = await supabase.from(table).select(selectedColumn).eq(ownerColumn, uid);
  if (remaining.error) {
    throw Object.assign(new Error(`Could not verify deletion of owned ${table} records.`), {
      code: remaining.error.code || 'supabase/verification-failed',
      table,
    });
  }

  if ((remaining.data ?? []).length > 0) {
    throw Object.assign(new Error(`Owned ${table} records remain after the deletion attempt.`), {
      code: 'supabase/cleanup-incomplete',
      table,
    });
  }
}

async function deleteOwnedSupabaseData(uid) {
  if (!isSupabaseConfigured || !supabase) {
    throw Object.assign(new Error('Supabase is not configured, so user-owned data cannot be verified.'), {
      code: 'supabase/not-configured',
    });
  }

  // Feedback is first because the current live RLS policy allows reads/inserts,
  // but may not allow deletes. Verify it is gone before deleting its profile:
  // the feedback FK otherwise sets user_id to NULL and leaves the message behind.
  await deleteAndVerifySupabaseRows('feedback', 'user_id', uid);
  await deleteAndVerifySupabaseRows('favorites', 'user_id', uid);
  // Project foreign keys cascade to pages, placed components, and asset metadata.
  await deleteAndVerifySupabaseRows('projects', 'user_id', uid);
  await deleteAndVerifySupabaseRows('settings', 'user_id', uid, 'user_id');
  await deleteAndVerifySupabaseRows('profiles', 'id', uid);
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
    deleteSupabaseData: deleteOwnedSupabaseData,
    deleteFirestoreProfile: deleteOwnedFirestoreData,
    deleteFirebaseAccount: deleteCurrentUser,
    onProgress,
  });
}
