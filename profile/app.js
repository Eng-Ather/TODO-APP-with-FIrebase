import {auth, signOut} from '../utils/firebaseSetup.js'

const logout_btn = document.getElementById('logout_btn')

logout_btn.addEventListener('click', ()=>{

    signOut(auth)
        .then(() => {    // Sign-out successful.
            console.log('Sign-out successful.');
        location.href = "../auth/signin/index.html"; })


        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);});


});



   
  