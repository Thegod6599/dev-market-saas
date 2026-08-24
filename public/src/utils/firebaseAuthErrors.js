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