// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBFLN_U1OlIjToHlCjStLolDK4vv2PVovo",
  authDomain: "aaradhyafirebaselearning.firebaseapp.com",
  projectId: "aaradhyafirebaselearning",
  storageBucket: "aaradhyafirebaselearning.firebasestorage.app",
  messagingSenderId: "261028954397",
  appId: "1:261028954397:web:2124180137332f4710a1f4",
  measurementId: "G-YQXC0CXDM0"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };