function deletionStepError(stage, cause, firestoreProfileDeleted = false) {
  const error = new Error('Account deletion did not complete.');
  error.stage = stage;
  error.code = cause?.code;
  error.cause = cause;
  error.firestoreProfileDeleted = firestoreProfileDeleted;
  return error;
}

export async function runAccountDeletion({
  user,
  currentPassword,
  passwordAuthentication,
  reauthenticate,
  verifyRecentSignIn,
  deleteSupabaseFeedback,
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

  onProgress('supabase-feedback');
  try {
    await deleteSupabaseFeedback(user.uid);
  } catch (error) {
    throw deletionStepError('supabase-feedback', error);
  }

  onProgress('firestore');
  try {
    await deleteFirestoreProfile(user.uid);
  } catch (error) {
    throw deletionStepError('firestore', error);
  }

  onProgress('firebase-auth');
  try {
    await deleteFirebaseAccount(user);
  } catch (error) {
    throw deletionStepError('firebase-auth', error, true);
  }

  return {
    firestoreProfileAndSettingsDeleted: true,
    firebaseAuthenticationDeleted: true,
  };
}
