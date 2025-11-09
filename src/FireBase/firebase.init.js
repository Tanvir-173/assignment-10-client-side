// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdsXPQRks7mKfzu1FLjfW74yWkULuaz2Q",
  authDomain: "assignment10-3c802.firebaseapp.com",
  projectId: "assignment10-3c802",
  storageBucket: "assignment10-3c802.firebasestorage.app",
  messagingSenderId: "18026212343",
  appId: "1:18026212343:web:7b0e95a0f7bc107e201cf2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);