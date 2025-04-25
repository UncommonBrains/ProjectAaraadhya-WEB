import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  UserCredential,
  sendEmailVerification,
} from 'firebase/auth';
import { auth, db } from '../../config/firebase';
import { getAuthErrorMessage } from '../../utils/firebaseErrorHandler';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

// Email/Password Registration
export const registerWithEmail = async (
  email: string,
  password: string,
  displayName: string,
  phoneNumber: string,
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Update profile if displayName is provided
    if (displayName && userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }

    const userDocRef = doc(db, 'users', userCredential.user.uid);

    await setDoc(userDocRef, {
      uid: userCredential.user.uid,
      email: email,
      displayName: displayName,
      phoneNumber: phoneNumber,
      photoURL: userCredential.user.photoURL,
      providerId: userCredential.user.providerData[0]?.providerId || 'unknown',
      isEmailVerified: userCredential.user.emailVerified,
      createdAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    });

    return userCredential;
  } catch (error) {
    console.error('Error during registration:', error);
    // Transform to more specific error with a user-friendly message
    const message = getAuthErrorMessage(error);
    throw new Error(message);
  }
};

// Email/Password Login
export const loginWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error during email login:', error);
    // Transform to more specific error with a user-friendly message
    const message = getAuthErrorMessage(error);
    throw new Error(message);
  }
};

// Google Authentication
export const loginWithGoogle = async (): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  } catch (error) {
    console.error('Error during Google login:', error);
    // Transform to more specific error with a user-friendly message
    const message = getAuthErrorMessage(error);
    throw new Error(message);
  }
};

// Sign Out
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};

// Password Reset
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error during password reset:', error);
    // Transform to more specific error with a user-friendly message
    const message = getAuthErrorMessage(error);
    throw new Error(message);
  }
};

// Verify Email
export const verifyEmail = async (user: User): Promise<void> => {
  try {
    await sendEmailVerification(user);
  } catch (error) {
    console.error('Error during email verification:', error);
    // Transform to more specific error with a user-friendly message
    const message = getAuthErrorMessage(error);
    throw new Error(message);
  }
};

// Get Current User
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
