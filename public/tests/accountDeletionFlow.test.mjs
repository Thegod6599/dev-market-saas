import assert from 'node:assert/strict';
import test from 'node:test';
import { runAccountDeletion } from '../src/services/accountDeletionFlow.js';

function makeOperations(overrides = {}) {
  const calls = [];
  const operations = {
    user: { uid: 'test-user' },
    currentPassword: 'test-only-password',
    passwordAuthentication: true,
    reauthenticate: async () => calls.push('reauthenticate'),
    verifyRecentSignIn: async () => calls.push('verify-recent-sign-in'),
    deleteSupabaseData: async (uid) => calls.push(`delete-supabase:${uid}`),
    deleteFirestoreProfile: async (uid) => calls.push(`delete-profile:${uid}`),
    deleteFirebaseAccount: async () => calls.push('delete-auth-account'),
    onProgress: (stage) => calls.push(`progress:${stage}`),
    ...overrides,
  };

  return { calls, operations };
}

test('reauthenticates, deletes Supabase and Firestore data, then deletes only that auth account', async () => {
  const { calls, operations } = makeOperations();

  const result = await runAccountDeletion(operations);

  assert.deepEqual(calls, [
    'progress:reauthentication',
    'reauthenticate',
    'progress:supabase',
    'delete-supabase:test-user',
    'progress:firestore',
    'delete-profile:test-user',
    'progress:firebase-auth',
    'delete-auth-account',
  ]);
  assert.deepEqual(result, {
    supabaseDataDeleted: true,
    firestoreProfileAndSettingsDeleted: true,
    firebaseAuthenticationDeleted: true,
  });
});

test('does not touch Supabase, Firestore, or Firebase Auth when reauthentication fails', async () => {
  const { calls, operations } = makeOperations({
    reauthenticate: async () => {
      calls.push('reauthenticate');
      throw Object.assign(new Error('invalid credential'), { code: 'auth/invalid-credential' });
    },
  });

  await assert.rejects(runAccountDeletion(operations), (error) => {
    assert.equal(error.stage, 'reauthentication');
    assert.equal(error.supabaseDataDeleted, false);
    assert.equal(error.firestoreProfileDeleted, false);
    assert.equal(error.code, 'auth/invalid-credential');
    return true;
  });
  assert.deepEqual(calls, ['progress:reauthentication', 'reauthenticate']);
});

test('does not touch Firestore or Firebase Auth when Supabase cleanup fails', async () => {
  const { calls, operations } = makeOperations({
    deleteSupabaseData: async (uid) => {
      calls.push(`delete-supabase:${uid}`);
      throw Object.assign(new Error('cleanup incomplete'), { code: 'supabase/cleanup-incomplete' });
    },
  });

  await assert.rejects(runAccountDeletion(operations), (error) => {
    assert.equal(error.stage, 'supabase');
    assert.equal(error.supabaseDataDeleted, false);
    assert.equal(error.firestoreProfileDeleted, false);
    assert.equal(error.code, 'supabase/cleanup-incomplete');
    return true;
  });
  assert.equal(calls.includes('delete-profile:test-user'), false);
  assert.equal(calls.includes('delete-auth-account'), false);
});

test('does not delete Firebase Authentication when Firestore cleanup fails', async () => {
  const { calls, operations } = makeOperations({
    deleteFirestoreProfile: async () => {
      calls.push('delete-profile:test-user');
      throw Object.assign(new Error('permission denied'), { code: 'permission-denied' });
    },
  });

  await assert.rejects(runAccountDeletion(operations), (error) => {
    assert.equal(error.stage, 'firestore');
    assert.equal(error.supabaseDataDeleted, true);
    assert.equal(error.firestoreProfileDeleted, false);
    assert.equal(error.code, 'permission-denied');
    return true;
  });
  assert.equal(calls.includes('delete-auth-account'), false);
});

test('reports partial cleanup and safely permits a retry after auth deletion fails', async () => {
  let authAttempts = 0;
  const deletedSupabaseUsers = new Set();
  const deletedProfiles = new Set();
  const { calls, operations } = makeOperations({
    deleteSupabaseData: async (uid) => {
      calls.push(`delete-supabase:${uid}`);
      deletedSupabaseUsers.add(uid);
    },
    deleteFirestoreProfile: async (uid) => {
      calls.push(`delete-profile:${uid}`);
      deletedProfiles.add(uid);
    },
    deleteFirebaseAccount: async () => {
      authAttempts += 1;
      calls.push('delete-auth-account');
      if (authAttempts === 1) {
        throw Object.assign(new Error('temporary failure'), { code: 'auth/network-request-failed' });
      }
    },
  });

  await assert.rejects(runAccountDeletion(operations), (error) => {
    assert.equal(error.stage, 'firebase-auth');
    assert.equal(error.supabaseDataDeleted, true);
    assert.equal(error.firestoreProfileDeleted, true);
    return true;
  });
  const retryResult = await runAccountDeletion(operations);

  assert.equal(deletedSupabaseUsers.has('test-user'), true);
  assert.equal(deletedProfiles.has('test-user'), true);
  assert.equal(authAttempts, 2);
  assert.equal(retryResult.firebaseAuthenticationDeleted, true);
});

test('checks session recency without invoking password reauthentication for other providers', async () => {
  const { calls, operations } = makeOperations({ passwordAuthentication: false });

  await runAccountDeletion(operations);

  assert.equal(calls.includes('verify-recent-sign-in'), true);
  assert.equal(calls.includes('reauthenticate'), false);
});
