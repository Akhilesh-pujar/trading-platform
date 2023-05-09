import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAd6yyeu2E_cTN9uXX1KZBSlzX56QN7xzo",
  authDomain: "flashcliq.firebaseapp.com",
  projectId: "flashcliq",
  storageBucket: "flashcliq.appspot.com",
  messagingSenderId: "820950819897",
  appId: "1:820950819897:web:e962a6505c37ca538419e8"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };
