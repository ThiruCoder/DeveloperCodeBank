// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getMessaging, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyDap3r0EN5DEktEMn2SIoXgEGuX3La208A",
  authDomain: "bank-project-in-react.firebaseapp.com",
  databaseURL:
    "https://bank-project-in-react-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "bank-project-in-react",
  storageBucket: "bank-project-in-react.firebasestorage.app",
  messagingSenderId: "806554353400",
  appId: "1:806554353400:web:6dd7f746223717a3c1450d",
  measurementId: "G-WNSBH8W4GH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const messaging = getMessaging(app);
