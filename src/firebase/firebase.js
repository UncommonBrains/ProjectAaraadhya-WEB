// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);