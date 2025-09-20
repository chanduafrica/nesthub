// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "sgnest-03586887-7b439",
  "appId": "1:25961790157:web:2c99b39ccf822f13630784",
  "storageBucket": "sgnest-03586887-7b439.appspot.com",
  "apiKey": "AIzaSyBLKFSMepOtOWogIgP_C-iZ2Bm6JLEa9jY",
  "authDomain": "sgnest-03586887-7b439.firebaseapp.com",
  "messagingSenderId": "25961790157"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
