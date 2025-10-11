// ✅ Hanya dijalankan di client
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // ... isi konfigurasi kamu di sini
  apiKey: "AIzaSyDc0UgzHrXbfzZx1vL8gSMd4Iw9rZqw7wA",
  authDomain: "my-next-app-79214.firebaseapp.com",
  projectId: "my-next-app-79214",
  storageBucket: "my-next-app-79214.firebasestorage.app",
  messagingSenderId: "371160973591",
  appId: "1:371160973591:web:60356f4b9fadb885e67752",
  measurementId: "G-71CVHK623C"
};

// Hindari inisialisasi ganda (penting di Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
