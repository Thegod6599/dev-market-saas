export function getAuthErrorMessage(err) {
  switch (err.code) {
    case "auth/invalid-credential":
      return "Invalid email or password.";

    case "auth/user-not-found":
      return "Invalid email or password.";

    case "auth/wrong-password":
      return "Invalid email or password.";

    case "auth/email-already-in-use":
      return "An account with this email already exists.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Your password is too weak.";

    case "auth/password-does-not-meet-requirements":
      return "Your password does not meet the requirements.";

    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";

    case "auth/popup-blocked":
      return "The Google sign-in popup was blocked. Please allow popups and try again.";

    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";

    case "auth/network-request-failed":
      return "A network error occurred. Check your connection and try again.";

    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";

    case "auth/unauthorized-domain":
      return "This sign-in method isn't available from this domain.";

    default:
      return "Something went wrong. Please try again.";
  }
}

export function getPasswordResetErrorMessage(error) {
  switch (error?.code) {
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/unauthorized-domain':
      return 'Password reset is not enabled for this app domain. Please try again later.';
    case 'auth/expired-action-code':
      return 'This password reset link has expired. Request a new one from the login page.';
    case 'auth/invalid-action-code':
      return 'This password reset link is invalid or has already been used. Request a new one from the login page.';
    case 'auth/weak-password':
      return 'Choose a stronger password and try again.';
    case 'auth/too-many-requests':
      return 'There have been too many attempts. Wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'A network error occurred. Check your connection and try again.';
    default:
      return 'We could not complete the password reset. Please try again.';
  }
}

export function getPasswordChangeErrorMessage(error) {
  switch (error?.code) {
    case 'auth/operation-not-allowed':
      return 'Password changes are only available for email/password accounts.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
    case 'auth/user-mismatch':
      return 'The current password is incorrect.';
    case 'auth/weak-password':
    case 'auth/password-does-not-meet-requirements':
      return 'Choose a stronger password and try again.';
    case 'auth/requires-recent-login':
      return 'Please sign in again before changing your password.';
    case 'auth/too-many-requests':
      return 'There have been too many attempts. Wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'A network error occurred. Check your connection and try again.';
    default:
      return 'We could not update your password. Please try again.';
  }
}

export function getAccountSettingsErrorMessage(error) {
  switch (error?.code) {
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/email-already-in-use':
    case 'auth/email-already-exists':
      return 'That email address is already in use.';
    case 'auth/requires-recent-login':
    case 'auth/user-token-expired':
      return 'For your security, sign in again before retrying this action.';
    case 'auth/network-request-failed':
      return 'A network error occurred. Check your connection and try again.';
    case 'auth/too-many-requests':
      return 'There have been too many attempts. Wait a moment and try again.';
    default:
      return 'We could not complete this account action. Please try again.';
  }
}

export function getAccountDeletionErrorMessage(error) {
  if (error?.stage === 'reauthentication') {
    switch (error.code) {
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
      case 'auth/user-mismatch':
        return 'The current password could not be verified. No profile or settings data was removed.';
      case 'auth/requires-recent-login':
        return 'Your sign-in is not recent enough. No profile or settings data was removed; sign out and sign in again, then retry.';
      case 'auth/network-request-failed':
        return 'A network error prevented sign-in verification. No profile or settings data was removed; check your connection and retry.';
      case 'auth/operation-not-allowed':
        return 'This sign-in method cannot be reauthenticated here. No profile or settings data was removed.';
      default:
        return 'We could not verify your sign-in, so no profile or settings data was removed. Check your details and retry.';
    }
  }

  if (error?.stage === 'firestore') {
    if (error.code === 'permission-denied') {
      return 'Access to your profile/settings document was denied. Firebase Authentication was not deleted; ask the app owner to review Firestore access rules.';
    }
    return 'Firestore profile/settings cleanup was not confirmed. Firebase Authentication was not deleted; check your connection and retry.';
  }

  if (error?.stage === 'supabase-feedback') {
    return 'Supabase feedback cleanup is not configured, so no profile/settings or Firebase account data was removed. A trusted Firebase UID-to-profiles.id server mapping and server-side feedback deletion endpoint are required before deletion can proceed.';
  }

  if (error?.stage === 'firebase-auth') {
    if (error.code === 'auth/requires-recent-login') {
      return 'Firestore profile/settings cleanup completed, but Firebase account deletion needs a recent sign-in. Sign in again and retry; the cleanup step is safe to repeat.';
    }
    return 'Firestore profile/settings cleanup completed, but Firebase account deletion was not confirmed. Retry while signed in; the cleanup step is safe to repeat.';
  }

  return 'We could not complete account deletion. No full-deletion success was recorded; retry the operation.';
}