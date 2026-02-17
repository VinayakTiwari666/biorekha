import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyBx9woGg2VWeUMBjAVNIoV9ttUQQ2bL38M",
  authDomain: "bio-rekha.firebaseapp.com",
  projectId: "bio-rekha",
  storageBucket: "bio-rekha.firebasestorage.app",
  messagingSenderId: "320221349153",
  appId: "1:320221349153:web:060b0bdcc61de229b26a60",
  measurementId: "G-YZJ3M4JNXT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();  // 👈 THIS LINE IS IMPORTANT
export const db = getFirestore(app);

