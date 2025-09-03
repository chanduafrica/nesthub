// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "digitalnest-t4ebk",
  "appId": "1:198507767471:web:5306295f5acc5901db965a",
  "storageBucket": "digitalnest-t4ebk.firebasestorage.app",
  "apiKey": "AIzaSyAFmZ3s2LfwvRn6JIVCW8d_h7qF7zW48Cs",
  "authDomain": "digitalnest-t4ebk.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "198507767471"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
