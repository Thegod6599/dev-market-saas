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