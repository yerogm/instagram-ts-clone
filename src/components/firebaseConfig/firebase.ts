// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQdyLop2ujJ-cjeENO8ySsoYPbDs7MUyo",
  authDomain: "instagram-typescript-bf826.firebaseapp.com",
  projectId: "instagram-typescript-bf826",
  storageBucket: "instagram-typescript-bf826.appspot.com",
  messagingSenderId: "698185904034",
  appId: "1:698185904034:web:1f3aad6b02b18904feccfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)