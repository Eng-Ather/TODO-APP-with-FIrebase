import { auth, signInWithEmailAndPassword } from "../../utils/firebaseSetup.js";

const login_email = document.getElementById("login_email");
const login_password = document.getElementById("login_password");
const signin_btn = document.getElementById("signin_btn");




signin_btn.addEventListener("click", () => {

  if (!login_email.value || !login_password.value) 
    {
    return alert("enter email and pasword both");
  }
   else {

    // ************************************( sign in )**********************************
    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
    
    // Signed in
    .then(       
      (userCredential) => {
      const user = userCredential.user;
      // console.log("user after login = " + user);
      location.href = "../../profile/index.html";
      login_email.value = " ";
      login_password.value = " "; })

    // if fails to Sign in
    .catch((error) => {     
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage); });  
  }
});

login_email.value = " ";
login_password.value = " ";