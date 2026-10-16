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
    deleteFirestoreProfile: async (uid) => calls.push(`delete-firestore-profile-and-feedback:${uid}`),
    deleteFirebaseAccount: async () => calls.push('delete-auth-account'),
    onProgress: (stage) => calls.push(`progress:${stage}`),
    ...overrides,
  };

  return { calls, operations };
}

test('reauthenticates, removes owned Firestore profile/feedback, then deletes Firebase Auth', async () => {
  const { calls, operations } = makeOperations();

  const result = await runAccountDeletion(operations);

  assert.deepEqual(calls, [
    'progress:reauthentication',
    'reauthenticate',
    'progress:firestore',
    'delete-firestore-profile-and-feedback:test-user',
    'progress:firebase-auth',
    'delete-auth-account',
  ]);
  assert.deepEqual(result, {
    firestoreProfileAndSettingsDeleted: true,
    firebaseAuthenticationDeleted: true,
  });
});

test('does not touch Firestore or Firebase Auth when reauthentication fails', async () => {
  const { calls, operations } = makeOperations({
    reauthenticate: async () => {
      calls.push('reauthenticate');
      throw Object.assign(new Error('invalid credential'), { code: 'auth/invalid-credential' });
    },
  });

  await assert.rejects(runAccountDeletion(operations), (error) => {
    assert.equal(error.stage, 'reauthentication');
    assert.equal(error.firestoreProfileDeleted, false);
    assert.equal(error.code, 'auth/invalid-credential');
    return true;
  });
  assert.deepEqual(calls, ['progress:reauthentication', 'reauthenticate']);
});

test('does not delete Firebase Authentication when Firestore cleanup fails', async () => {
  const { calls, operations } = makeOperations({
    deleteFirestoreProfile: async () => {
      calls.push('delete-firestore-profile-and-feedback:test-user');
      throw Object.assign(new Error('permission denied'), { code: 'permission-denied' });
    },
  });

  await assert.rejects(runAccountDeletion(operations), (error) => {
    assert.equal(error.stage, 'firestore');
    assert.equal(error.firestoreProfileDeleted, false);
    assert.equal(error.code, 'permission-denied');
    return true;
  });
  assert.equal(calls.includes('delete-auth-account'), false);
});

test('reports partial cleanup and allows retry if Firebase Auth deletion fails', async () => {
  let authAttempts = 0;
  let firestoreCleanupAttempts = 0;
  const { calls, operations } = makeOperations({
    deleteFirestoreProfile: async (uid) => {
      calls.push(`delete-firestore-profile-and-feedback:${uid}`);
      firestoreCleanupAttempts += 1;
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
    assert.equal(error.firestoreProfileDeleted, true);
    return true;
  });
  const retryResult = await runAccountDeletion(operations);

  assert.equal(firestoreCleanupAttempts, 2);
  assert.equal(authAttempts, 2);
  assert.equal(retryResult.firebaseAuthenticationDeleted, true);
});

test('checks session recency without password reauthentication for other providers', async () => {
  const { calls, operations } = makeOperations({ passwordAuthentication: false });

  await runAccountDeletion(operations);

  assert.equal(calls.includes('verify-recent-sign-in'), true);
  assert.equal(calls.includes('reauthenticate'), false);
});
