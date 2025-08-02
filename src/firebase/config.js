// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


 const firebaseConfig = {
  apiKey: "AIzaSyCdEZ9vfCq6IMBi03rBUn75pCuOeLwMZ5Q",
  authDomain: "prototype-kaineware.firebaseapp.com",
  projectId: "prototype-kaineware",
  storageBucket: "prototype-kaineware.firebasestorage.app",
  messagingSenderId: "99309497729",
  appId: "1:99309497729:web:592aadc96959c8d77acc80",
  measurementId: "G-FW79XEK5FL"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
