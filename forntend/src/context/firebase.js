// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCC9CaAFMWZF6JI8Yvm1SYyO7Ol_JnBTu4",
  authDomain: "twitter-clone-b7866.firebaseapp.com",
  projectId: "twitter-clone-b7866",
  storageBucket: "twitter-clone-b7866.appspot.com",
  messagingSenderId: "528602851384",
  appId: "1:528602851384:web:9008eecc16db62ebbfdecd",
  measurementId: "G-18CWTRYMH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;