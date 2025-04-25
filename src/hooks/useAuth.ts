import { useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User, mapFirebaseUserToUser } from '../models/entities/User';

interface AuthState {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: Error | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    firebaseUser: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        try {
          if (firebaseUser) {
            // User is signed in
            const userDocRef = doc(db, 'users', firebaseUser.uid);
            const userDoc = await getDoc(userDocRef);

            let userData: Partial<User> = {};

            if (userDoc.exists()) {
              // Get existing user data
              userData = userDoc.data() as Partial<User>;

              // Update last login time
              await setDoc(userDocRef, { lastLoginAt: serverTimestamp() }, { merge: true });
            } else {
              // Create new user document
              userData = {
                createdAt: new Date(),
                lastLoginAt: new Date(),
              };
              await setDoc(userDocRef, {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                providerId: firebaseUser.providerData[0]?.providerId || 'unknown',
                isEmailVerified: firebaseUser.emailVerified,
                createdAt: serverTimestamp(),
                lastLoginAt: serverTimestamp(),
              });
            }

            // Map Firebase user to our User model
            const user = mapFirebaseUserToUser(firebaseUser, userData);

            setAuthState({
              user,
              firebaseUser,
              loading: false,
              error: null,
            });
          } else {
            // User is signed out
            setAuthState({
              user: null,
              firebaseUser: null,
              loading: false,
              error: null,
            });
          }
        } catch (error) {
          console.error('Auth state changed error:', error);
          setAuthState({
            user: null,
            firebaseUser: null,
            loading: false,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      },
      (error) => {
        console.error('Auth state error:', error);
        setAuthState({
          user: null,
          firebaseUser: null,
          loading: false,
          error,
        });
      },
    );

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  return authState;
};
