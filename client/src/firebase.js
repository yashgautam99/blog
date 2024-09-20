// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-447a1.firebaseapp.com",
  projectId: "mern-blog-447a1",
  storageBucket: "mern-blog-447a1.appspot.com",
  messagingSenderId: "1072426381127",
  appId: "1:1072426381127:web:8b6c1f6dc51398c0c4e662",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
