import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "cari apa wkwkwkkwkw?",
  authDomain: "cari apa wkwkwkkwkw?",
  databaseURL: "cari apa wkwkwkkwkw?",
  projectId: "cari apa wkwkwkkwkw?",
  storageBucket: "cari apa wkwkwkkwkw?",
  messagingSenderId: "cari apa wkwkwkkwkw?",
  appId: "cari apa wkwkwkkwkw?",
  measurementId: "cari apa wkwkwkkwkw?",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const provider = new GoogleAuthProvider();

export { app, auth, database, provider };
