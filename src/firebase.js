import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; 
import { GoogleAuthProvider,getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5uNBKghzoVAzQC69pLRbU62L5jXQ1Hso",
  authDomain: "clone-yt-86749.firebaseapp.com",
  projectId: "clone-yt-86749",
  storageBucket: "clone-yt-86749.firebasestorage.app",
  messagingSenderId: "993764442653",
  appId: "1:993764442653:web:3e79618b7ab633064e7cf4",
  measurementId: "G-7XX4RV6SBB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();