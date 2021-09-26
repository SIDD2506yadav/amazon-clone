import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDMc6u6Ul56OHSdrA2yqGQ4nzrhyoKdHao",
    authDomain: "clone-cb98d.firebaseapp.com",
    projectId: "clone-cb98d",
    storageBucket: "clone-cb98d.appspot.com",
    messagingSenderId: "37103839819",
    appId: "1:37103839819:web:f9f0e9e36f794e4d553bce",
    measurementId: "G-3NTF7PZ3S5",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
export { db, auth };
