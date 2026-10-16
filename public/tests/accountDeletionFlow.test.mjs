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
    deleteUserData: async (uid) => calls.push(`delete-user-data:${uid}`),
    deleteFirebaseAccount: async () => calls.push('delete-auth-account'),
    onProgress: (stage) => calls.push(`progress:${stage}`),
    ...overrides,
  };

  return { calls, operations };
}

test('reauthenticates, deletes registered user data, then deletes the auth account', async () => {
  const { calls, operations } = makeOperations();
  const result = await runAccountDeletion(operations);

  assert.deepEqual(calls, [
    'progress:reauthentication',
    'reauthenticate',
    'progress:firestore',
    'delete-user-data:test-user',
    'progress:firebase-auth',
    'delete-auth-account',
  ]);
  assert.deepEqual(result, {
    firestoreProfileAndSettingsDeleted: true,
    firestoreUserDataDeleted: true,
    firebaseAuthenticationDeleted: true,
  });
});

test('does not start data cleanup when reauthentication fails', async () => {
  const { calls, operations } = makeOperations({
    reauthenticate: async () => {
      calls.push('reauthenticate');
      throw Object.assign(new Error('invalid credential'), { code: 'auth/invalid-credential' });
    },
  });

  await assert.rejects(runAccountDeletion(operations), (error) => {
    assert.equal(error.stage, 'reauthentication');
    assert.equal(error.userDataDeleted, false);
    assert.equal(error.code, 'auth/invalid-credential');
    return true;
  });
  assert.deepEqual(calls, ['progress:reauthentication', 'reauthenticate']);
});

test('does not delete Firebase Authentication when a data-cleanup task fails', async () => {
  const { calls, operations } = makeOperations({
    deleteUserData: async (uid) => {
      calls.push(`delete-user-data:${uid}`);
      throw Object.assign(new Error('permission denied'), {
        code: 'permission-denied',
        failedTask: 'feedback',
        completedTasks: [],
      });
    },
  });

  await assert.rejects(runAccountDeletion(operations), (error) => {
    assert.equal(error.stage, 'firestore');
    assert.equal(error.userDataDeleted, false);
    assert.equal(error.failedTask, 'feedback');
    assert.equal(error.code, 'permission-denied');
    return true;
  });
  assert.equal(calls.includes('delete-auth-account'), false);
});

test('reports that user data was deleted if Firebase Authentication deletion fails', async () => {
  const { calls, operations } = makeOperations({
    deleteFirebaseAccount: async () => {
      calls.push('delete-auth-account');
      throw Object.assign(new Error('temporary failure'), { code: 'auth/network-request-failed' });
    },
  });

  await assert.rejects(runAccountDeletion(operations), (error) => {
    assert.equal(error.stage, 'firebase-auth');
    assert.equal(error.userDataDeleted, true);
    assert.equal(error.firestoreProfileDeleted, true);
    return true;
  });
  assert.equal(calls.includes('delete-auth-account'), true);
});

test('checks recent sign-in for non-password providers', async () => {
  const { calls, operations } = makeOperations({ passwordAuthentication: false });
  await runAccountDeletion(operations);
  assert.equal(calls.includes('verify-recent-sign-in'), true);
  assert.equal(calls.includes('reauthenticate'), false);
});
