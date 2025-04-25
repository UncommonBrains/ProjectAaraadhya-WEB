// Common Firebase Auth error codes and their user-friendly messages
export const getFirebaseAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    // Email/Password Authentication Errors
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please use a different email or try logging in.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please check your email or register.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again or reset your password.';
    case 'auth/invalid-credential':
      return 'Invalid credentials. Please check your email and password and try again.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful login attempts. Please try again later or reset your password.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use a stronger password with at least 6 characters.';

    // Google Sign-In Errors
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email address but different sign-in credentials. Try signing in using a different method.';
    case 'auth/popup-blocked':
      return 'The sign-in popup was blocked by your browser. Please allow popups for this website and try again.';
    case 'auth/popup-closed-by-user':
      return 'The sign-in popup was closed before completing authentication. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'The sign-in process was cancelled. Please try again.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.';

    // General Errors
    case 'auth/network-request-failed':
      return 'A network error occurred. Please check your internet connection and try again.';
    case 'auth/timeout':
      return 'The operation has timed out. Please try again.';
    case 'auth/internal-error':
      return 'An internal error occurred. Please try again later.';

    default:
      return 'An error occurred during authentication. Please try again.';
  }
};

// Extract Firebase error code from error object
export const extractFirebaseErrorCode = (error: any): string => {
  // Most Firebase errors include a code property
  if (error.code) {
    return error.code;
  }

  // Some errors may have the code in the message
  if (error.message && error.message.includes('auth/')) {
    const match = error.message.match(/auth\/[a-z-]+/);
    if (match) {
      return match[0];
    }
  }

  return 'unknown-error';
};

// Get user-friendly error message from Firebase error
export const getAuthErrorMessage = (error: any): string => {
  const errorCode = extractFirebaseErrorCode(error);
  return getFirebaseAuthErrorMessage(errorCode);
};
