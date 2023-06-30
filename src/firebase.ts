import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDQU_3SjwNbGKB8PnK49gH-eoZpG_Y7r2A",
  authDomain: "chessgame-64696.firebaseapp.com",
  projectId: "chessgame-64696",
  storageBucket: "chessgame-64696.appspot.com",
  messagingSenderId: "397020579514",
  appId: "1:397020579514:web:aae670ae99db3ed8ed2483",
  measurementId: "G-BT9J3RSJCM"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebase);
export const authService = getAuth(firebase);