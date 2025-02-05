import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore, collection, CollectionReference } from "firebase/firestore";

// Verifique se todas as variáveis de ambiente estão definidas
// const requiredEnvVars = [
//   "NEXT_PUBLIC_FIREBASE_API_KEY",
//   "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
//   "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
//   "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
//   "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
//   "NEXT_PUBLIC_FIREBASE_APP_ID",
// ];

// requiredEnvVars.forEach((envVar) => {
//   if (!process.env[envVar]) {
//     throw new Error(`🔥 ERRO: A variável ${envVar} não está definida!`);
//   }
// });

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1RHZvfewrrIsH-ApsM2qrfYWEPRn-4do",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Evita inicializar o Firebase mais de uma vez
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const convidadosRef: CollectionReference = collection(db, "convidados");

export { auth, db, convidadosRef, app };