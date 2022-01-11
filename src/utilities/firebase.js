import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrw4061D-4YgBYXOLtnSK14Oc6hZPtIAw",
  authDomain: "ecoexchange-8f6ad.firebaseapp.com",
  projectId: "ecoexchange-8f6ad",
  storageBucket: "ecoexchange-8f6ad.appspot.com",
  messagingSenderId: "930419348327",
  appId: "1:930419348327:web:96fbcf92d5a269064f15c2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();

const storage = getStorage();
// Points to the root reference
const storageRef = ref(storage);
// Points to 'images'
const imagesRef = ref(storageRef, "images");

export const findImageUrl = async (path) => {
  const url = await getDownloadURL(ref(imagesRef, path));
  return url;
};

export const uploadFile = async (file) => {
  const metadata =  {
    contentType: "image",
  }  
  const storageRef = ref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    console.log(file)
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      console.log(error)
      switch (error.code) {  
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
        default:
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );
};
