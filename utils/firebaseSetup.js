// Import the functions you need from the SDKs you need
import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

import { getAnalytics } 
from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";

//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAgokWQxAtipXeTxMcxbR3vbhO_7WbCJ0",
  authDomain: "todo-app-by-ather.firebaseapp.com",
  projectId: "todo-app-by-ather",
  storageBucket: "todo-app-by-ather.appspot.com",
  messagingSenderId: "264046251784",
  appId: "1:264046251784:web:e00e46bfed6726d8a926bd",
  measurementId: "G-EWLBR1SF42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log(app);

// __________________________________( EXPORT ) ________________________________________

  export{
    // checkUser
    getAuth,
    onAuthStateChanged
  }