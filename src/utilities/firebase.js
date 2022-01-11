import {initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

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

const storage = getStorage();
// Points to the root reference
const storageRef = ref(storage);
// Points to 'images'
const imagesRef = ref(storageRef, 'images');

export const findImageUrl = async (path) => {
    const url = await getDownloadURL(ref(imagesRef, path));
    return url;
}