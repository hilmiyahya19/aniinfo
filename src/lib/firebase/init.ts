// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDc0UgzHrXbfzZx1vL8gSMd4Iw9rZqw7wA",
  authDomain: "my-next-app-79214.firebaseapp.com",
  projectId: "my-next-app-79214",
  storageBucket: "my-next-app-79214.firebasestorage.app",
  messagingSenderId: "371160973591",
  appId: "1:371160973591:web:60356f4b9fadb885e67752",
  measurementId: "G-71CVHK623C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;