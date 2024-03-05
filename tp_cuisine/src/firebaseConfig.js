// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA45iKwrqGEKwAtq_evFZ2o-pvu52v4Xcg",
  authDomain: "fir-cee03.firebaseapp.com",
  databaseURL: "https://fir-cee03-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-cee03",
  storageBucket: "fir-cee03.appspot.com",
  messagingSenderId: "242280954198",
  appId: "1:242280954198:web:345a88fc2a2db9b017bef7",
  measurementId: "G-DG0TG2K354",
  databaseUrl : "https://fir-cee03-default-rtdb.europe-west1.firebasedatabase.app/"
};
export const BASE_DB_URLv= firebaseConfig.databaseUrl;
export const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseConfig.apiKey}`
export const SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseConfig.apiKey}`

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);