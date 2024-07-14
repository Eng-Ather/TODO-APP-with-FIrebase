import { getAuth,auth, onAuthStateChanged } 
from "./utils/firebaseSetup.js";


  onAuthStateChanged(auth, (user) => {

     if (user) {    // whenever User is signed in 
      const uid = user.uid;
      location.href = 'profile/index.html';}

     else {          // whenever User is signed out
      location.href = "auth/signin/index.html";}
  });

  

var signin_option = document.getElementById("signin_option");
var signup_option = document.getElementById("signup_option");

signin_option.addEventListener("click", () => {
  location.href = "./auth/signin/index.html";});

signup_option.addEventListener("click", () => {
  location.href = "./auth/signup/index.html";});
