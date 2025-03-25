// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqNnHKqu_yfHVbczaPMcDI0O24QvyOhg8",
  authDomain: "aitripplanner-778ac.firebaseapp.com",
  projectId: "aitripplanner-778ac",
  storageBucket: "aitripplanner-778ac.firebasestorage.app",
  messagingSenderId: "157088760382",
  appId: "1:157088760382:web:1c871a7d4edd5db710c76f",
  measurementId: "G-L4MLDRPV94"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);