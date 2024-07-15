// Import the functions you need from the SDKs you need
import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";

//for Authentication
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

//for storage
import { 
  getStorage,        // to initallize storage
  ref ,             // to creat refrence of storage
  uploadBytes,     // to upload file
  getDownloadURL  // to download file
  } 
from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";

// import {
//   getFirestore,     //to initallize firestore
//   collection,      //to create collection in firestore
//   doc,            // to create doc inside collection
//   addDoc,        //to add TODO (data)
//   getDocs,      //to get TODO (data)
//   deleteDoc,   //to delete TODO (save data)   
// } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


import { 
  getFirestore,     //to initallize firestore
  collection,      //to create collection in firestore
  doc,            // to create doc inside collection
  addDoc,        //to add TODO (data)
  setDoc,
  getDocs,      //to get TODO (data)
  deleteDoc,   //to delete TODO (save data)
   } 
from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";




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
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);


   
console.log('auth : ',auth);
console.log('App : ' + app);
console.log("Storage : " + storage);


// __________________________________( EXPORT ) ________________________________________

  export{
    // import for authentication
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    auth, 
    createUserWithEmailAndPassword,
    signOut,

    // import for storage (store file/image)
    getStorage,        
    ref ,             
    uploadBytes,     
    getDownloadURL,
    storage,

    // import for fire store
    db,
    getFirestore,     
    collection,     
    doc,            
    addDoc, 
    setDoc,   
    getDocs,   
    deleteDoc, 
    }