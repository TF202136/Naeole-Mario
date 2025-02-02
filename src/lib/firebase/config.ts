// Import the functions you need from the SDKs you need
import {  FirebaseApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore, collection, CollectionReference } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only on the client side
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let convidadosRef: CollectionReference | undefined;

if (typeof window !== "undefined") {
  // Code is running in the browser
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  convidadosRef = collection(db, "convidados");
} else {
  // Skip Firebase initialization on the server side
  console.warn("Firebase is running on the server. Initialization was skipped.");
}

export { auth, db, convidadosRef, app };
