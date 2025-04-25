export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber?: string | null;
  photoURL: string | null;
  providerId: string;
  isEmailVerified: boolean;
  createdAt?: Date;
  lastLoginAt?: Date;
}

export const mapFirebaseUserToUser = (firebaseUser: any, additionalData?: Partial<User>): User => {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    providerId: firebaseUser.providerData[0]?.providerId || 'unknown',
    isEmailVerified: firebaseUser.emailVerified,
    ...additionalData,
  };
};
