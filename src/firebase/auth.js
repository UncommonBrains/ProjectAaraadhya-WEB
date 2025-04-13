import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword, GoogleAuthProvider } from "firebase/auth";
import {auth, db } from "./firebase";
import { doc, setDoc, serverTimestamp  } from 'firebase/firestore';


export const doCreateUserWithEmailAndPassword = async (email, password, name, phone) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: serverTimestamp(),      // Firestore server timestamp
      isVerified: user.emailVerified,    // Firebase User property
      name: name,                          // You can fill this later from a form
      phone: phone,                         // Same here
      role: "devotee",                   // Default role
      status: "active"                   // Default status
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
};


export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword (auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup (auth, provider);
  // result.user
  return result ;
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

