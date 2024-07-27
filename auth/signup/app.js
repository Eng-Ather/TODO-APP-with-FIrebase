import {
  //for authentication
  getAuth, 
  auth,
  createUserWithEmailAndPassword,

  //for file storege
  getStorage,        
  ref ,    
  storage,         
  uploadBytes,     
  getDownloadURL,

// for firestorage
  db,
  getFirestore,     
    collection,     
    doc,            
    addDoc,    
    setDoc,
    getDocs,   
    deleteDoc,
}
 from '../../utils/firebaseSetup.js'

const signup_fname = document.getElementById("signup_fname");
const signup_lname = document.getElementById("signup_lname");
const signup_image = document.getElementById("signup_image");
const signup_email = document.getElementById("signup_email");
const signup_password = document.getElementById("signup_password");
const signup_btn = document.getElementById("signup_btn");

// // console.log(signup_image.file);

// signup_btn.addEventListener("click", () => {
  
//  if (!signup_email.value || !signup_password.value || !signup_fname.value
//  || !signup_lname.value) 
//  { return alert("fill all field"); } 

//  //if input feiled are correctly fill so this block will proceed
//  else 
//  {
//     //collect user info in an object so it can be easily store in firebase db
//     var userInfo_Object=
//     {
//      userName: `${signup_fname.value} ${signup_lname.value }`,
//      userEmail: signup_email.value,
//      userPassword : signup_password.value,
//    };
  
//     // ************** (to create account in firestore )**********************
//     createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
    
//     //if Signed up 
//     .then((userCredential) =>{              
//       console.log('user : ', userCredential.user.uid);

//           //to upload image
//           const userImageRef = ref(storage, `images/${signup_image.files[0].name}`)
//           uploadBytes(userImageRef, signup_image.files[0])  // Upload the file to the storage reference
//           .then((snapshot) =>{
//             console.log('Uploaded a file to storage!');
          
//              //down load image url
//               getDownloadURL(userImageRef)       
//               .then((url) => {
//                   userInfo_Object.userImage = url;
//                   console.log(userInfo_Object);
                
//                     // created user collection --> document reference
//                     const userDbRef = doc(db, "usersProfile", userCredential.user.uid);
//                     // set this collection --> document to db
//                     setDoc(userDbRef, userInfo_Object)
//                     .then(() => {
//                     console.log("User info Object Updated into DB with name userProfile");
//                     location.href = "../signin/index.html";   
//                     })
//                     .catch((error) => {
//                       const errorCode = error.code;
//                       alert(error);
//                       console.log('ERRor - ',error);
//                     })
//               })
//              .catch((error) => {
//               console.log('Error uploading file:', error);
//                });
//           })

//       .catch((error) => {
//           const errorCode = error.code;
//           alert(error);
//           console.log('ERRor - ',error);
//         });
//  }

// });

//  // clearing all input feild
//  signup_fname.value = ''
//  signup_lname.value = ''
//  signup_email.value = ''
//  signup_password.value = ''
//  signup_image.value = ''




// ***********************************************




signup_btn.addEventListener("click", () => {
  if (!signup_email.value || !signup_password.value || !signup_fname.value || !signup_lname.value || !signup_image.files[0]) {
    return alert("Please fill all fields.");
  } else {
    signup_btn.disabled = true //disable submit button
  
    var userInfo_Object = {
      userName: `${signup_fname.value} ${signup_lname.value}`,
      userEmail: signup_email.value,
      userPassword: signup_password.value,
    };

    // Creating user account in Firebase Authentication
    createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
      .then((userCredential) => {
        console.log('User UID:', userCredential.user.uid);

        // Upload image to Firebase Storage
        const userImageRef = ref(storage, `images/${signup_image.files[0].name}`);
        uploadBytes(userImageRef, signup_image.files[0])
          .then((snapshot) => {
            console.log('Uploaded a file to storage!');

            // Get download URL for the uploaded image
            getDownloadURL(userImageRef)
              .then((url) => {
                userInfo_Object.userImage = url;
                console.log(userInfo_Object);

                // Create user profile document in Firestore
                const userDbRef = doc(db, "usersProfile", userCredential.user.uid);
                setDoc(userDbRef, userInfo_Object)
                  .then(() => {
                    console.log("User info Object Updated into DB with name userProfile");
                    location.href = "../../profile/index.html";

                  })
                  .catch((error) => {
                    console.error('Error setting document:', error);
                    alert('Failed to create user profile.');
                  });
              })
              .catch((error) => {
                console.error('Error getting download URL:', error);
                alert('Failed to get download URL.');
              });
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            alert('Failed to upload image.');
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(error.message); // Displaying the error message to the user
        console.error('Error creating user:', error);
      });
  }
  // signup_btn.disabled = false //disable submit button

});

// Clearing all input fields (should be done after successful signup)
signup_fname.value = '';
signup_lname.value = '';
signup_email.value = '';
signup_password.value = '';
signup_image.value = '';
