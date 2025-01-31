// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB1RHZvfewrrIsH-ApsM2qrfYWEPRn-4do",
  authDomain: "naeolemariowedding.firebaseapp.com",
  projectId: "naeolemariowedding",
  storageBucket: "naeolemariowedding.firebasestorage.app",
  messagingSenderId: "753350597593",
  appId: "1:753350597593:web:f688d4ae5f9f06dc4c17c8",
  measurementId: "G-ZGYXNDN7YX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const convidadosRef = collection(db, "convidados");

export {
  auth,
  db,
  convidadosRef,
  signInWithEmailAndPassword,
  signOut,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
};
