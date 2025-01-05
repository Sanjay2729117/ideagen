// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBZYT3W24jYcV5rtLu4L7KUV6qI7senkeM",
  authDomain: "idea-generator-for-students.firebaseapp.com",
  projectId: "idea-generator-for-students",
  storageBucket: "idea-generator-for-students.firebasestorage.app",
  messagingSenderId: "259964577937",
  appId: "1:259964577937:web:47b21eb0dc14ec3a4fb730",
  measurementId: "G-61VCJ3V70G"
};
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
const analytics = getAnalytics(app);