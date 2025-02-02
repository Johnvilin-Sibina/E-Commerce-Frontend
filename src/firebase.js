// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lootmart-dd9e8.firebaseapp.com",
  projectId: "lootmart-dd9e8",
  storageBucket: "lootmart-dd9e8.firebasestorage.app",
  messagingSenderId: "55938783965",
  appId: "1:55938783965:web:110ecca94cd700b94a5934",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
