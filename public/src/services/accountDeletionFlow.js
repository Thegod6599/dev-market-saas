function deletionStepError(stage, cause, userDataDeleted = false) {
  const error = new Error('Account deletion did not complete.');
  error.stage = stage;
  error.code = cause?.code;
  error.cause = cause;
  error.userDataDeleted = userDataDeleted;
  // Preserve compatibility with existing UI code using the old property.
  error.firestoreProfileDeleted = userDataDeleted;
  error.failedTask = cause?.failedTask;
  error.completedTasks = cause?.completedTasks ?? [];
  return error;
}

export async function runAccountDeletion({
  user,
  currentPassword,
  passwordAuthentication,
  reauthenticate,
  verifyRecentSignIn,
  deleteUserData,
  deleteFirestoreProfile,
  deleteFirebaseAccount,
  onProgress = () => {},
}) {
  if (!user?.uid) {
    const error = new Error('No signed-in account was provided.');
    error.code = 'auth/no-current-user';
    throw deletionStepError('reauthentication', error);
  }

  onProgress('reauthentication');
  try {
    if (passwordAuthentication) {
      await reauthenticate(user, currentPassword);
    } else {
      await verifyRecentSignIn(user);
    }
  } catch (error) {
    throw deletionStepError('reauthentication', error);
  }

  onProgress('firestore');
  try {
    // Support the previous handler name for any existing tests/callers.
    if (deleteUserData) {
      await deleteUserData(user.uid);
    } else if (deleteFirestoreProfile) {
      await deleteFirestoreProfile(user.uid);
    } else {
      throw new Error('No user-data cleanup handler was provided.');
    }
  } catch (error) {
    throw deletionStepError('firestore', error, false);
  }

  onProgress('firebase-auth');
  try {
    await deleteFirebaseAccount(user);
  } catch (error) {
    throw deletionStepError('firebase-auth', error, true);
  }

  return {
    firestoreProfileAndSettingsDeleted: true,
    firestoreUserDataDeleted: true,
    firebaseAuthenticationDeleted: true,
  };
}
