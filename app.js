import { getAuth, onAuthStateChanged } 
from "./utils/firebaseSetup.js";

// checkUser();

// --------------( checkUser function impot from index - app.js -- main page)--------------------------
function checkUser() {
  //pre-define function of firebase used to check either any user is login or not
  onAuthStateChanged(auth, (user) => {
console.log('abc');

    if (user) {
      // if User is signed in so it display todo page(Authenticated user page)
      const uid = user.uid;
      // login_email.value = " ";
      // login_password.value = " ";
      location.href = "/Authenticated_user.html";
    } else {
      // if User is signed out so it will display login page(signin.html)
      location.href = "../../auth/";
    }
  });
}

var signin_option = document.getElementById("signin_option");
var signup_option = document.getElementById("signup_option");

console.log(signin_option.innerHTML);
console.log(signup_option.innerHTML);

signin_option.addEventListener("click", () => {
  location.href = "./auth/signin/index.html";
});

signup_option.addEventListener("click", () => {
  location.href = "./auth/signup/index.html";
});
