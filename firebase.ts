import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXstsZfJ-7uEujulpGcZEwPN--CxmY_qg",
  authDomain: "trading-plaform.firebaseapp.com",
  projectId: "trading-plaform",
  storageBucket: "trading-plaform.appspot.com",
  messagingSenderId: "225380924544",
  appId: "1:225380924544:web:e962ca28042c43371a7a65",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };
