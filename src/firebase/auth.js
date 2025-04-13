import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  sendPasswordResetEmail, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  updatePassword, 
  GoogleAuthProvider, 
} from "firebase/auth";
import {auth, db } from "./firebase";
import { doc, setDoc, serverTimestamp  } from 'firebase/firestore';


export const doCreateUserWithEmailAndPassword = async (name, phone, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),
      isVerified: user.emailVerified,
      name: name,
      phone: phone,
      role: "devotee",
      status: "active"
    });
    console.log("User document created in Firestore:", user.uid, user.email, name);
    return userCredential;
  } catch (error) {
    console.error("Error in doCreateUserWithEmailAndPassword:", error);
    throw error;
  }
};


export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword (auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
    
  });
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google sign-in successful:", result.user);
    
    const userData = {
      uid: result.user.uid,
      email: result.user.email,
      name: result.user.displayName,
      lastLogin: serverTimestamp(),
      isVerified: result.user.emailVerified,
      role: "devotee",
      status: "active",
      createdAt: serverTimestamp()
    };
    
    try {
      // Check if user is authenticated before writing
      if (!auth.currentUser) {
        throw new Error('User must be authenticated to write to Firestore');
      }
      
      const userRef = doc(db, "users", result.user.uid);
      await setDoc(userRef, userData, { merge: true });
      console.log("Firestore document created/updated successfully");
    } catch (firestoreError) {
      console.error("Firestore saving error:", firestoreError);
      // Log more details about the error
      console.error("Error code:", firestoreError.code);
      console.error("Error message:", firestoreError.message);
      throw firestoreError;
    }
    
    return result;
  } catch (error) {
    console.error("Google sign-in error:", error);
    throw error;
  }
};

export const doSignOut = () => {
  return auth.signOut();
};

export const passwordReset = (email) => {
  return sendPasswordResetEmail (auth, email);
}

export const doPasswordChange = (password) => {
  return updatePassword (auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification (auth.currentUser, {
    url: `${window.location.orgin}/`
})
}
