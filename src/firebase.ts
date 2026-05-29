import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAQifZ3nz_XwRnqNYXVMsn3k0wkFkHkQxY",
  authDomain: "jobcv-ai-305.firebaseapp.com",
  projectId: "jobcv-ai-305",
  storageBucket: "jobcv-ai-305.firebasestorage.app",
  messagingSenderId: "276935884524",
  appId: "1:276935884524:web:8281bf94bf7fe141f3efc9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
