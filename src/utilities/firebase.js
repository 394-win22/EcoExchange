import {initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyDrw4061D-4YgBYXOLtnSK14Oc6hZPtIAw",
    authDomain: "ecoexchange-8f6ad.firebaseapp.com",
    projectId: "ecoexchange-8f6ad",
    storageBucket: "ecoexchange-8f6ad.appspot.com",
    messagingSenderId: "930419348327",
    appId: "1:930419348327:web:96fbcf92d5a269064f15c2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();