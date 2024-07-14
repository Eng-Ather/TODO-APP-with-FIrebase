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



signup_btn.addEventListener("click", () => {
  
  //________________________________( to cereate account )______________________________
    if (!signup_email.value || !signup_password.value) {  //if input feild are empty it show an error 
    return alert("enter email and pasword both");
    } 
    else    //if input feiled are correctly fill so this block will proceed
    {
        // ************** (to create account in firestore )**********************
      createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
    
      //if Signed up 
      .then((userCredential) =>
         {              console.log('user : ', user.user.uid);
             const user = userCredential.user; 
             uploadImage()
              // clearing all input feild
          signup_fname.value = ''
          signup_lname.value = ''
          signup_email.value = ''
          signup_password.value = ''
          signup_image.value = ''  
          // console.log(`user signup successfully! \n  user-id: ${user.email}`);

          location.href = ' ../../profile/index.html'
        })

        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert('Error messag : ',errorMessage);});
    }

    
// ________________________________( upload Image )_____________________________________


});

function uploadImage() {
  const userImageRef = ref(storage, `images/${signup_image.files[0].name}`)

  uploadBytes(userImageRef, signup_image.files[0])  // Upload the file to the storage reference
  .then((snapshot) =>
     {
        console.log('Uploaded a file to storage!');

         //*****************************************
        
         getDownloadURL(userImageRef)       //download image URL
         .then((url) => {
          //  var current_id = getCurrentUserId(); // get current user id
            console.log('Image URL:', url);

                  //******************* */
                    // const imageCollection = collection(db, 'profile_pic')
                    addDoc(collection(db, "profile_pic"), 
                    { url,
                      // user_Idd : current_id
                     })
                      .then(()=>{ console.log('updated file to db');})
                      .catch((error)=>{ console.log(error);})
                  //*************** */
       })
          .catch((error) => {
            console.log('Error getting download URL:', error);
            // Handle any errors
          });
  // *************************************************
     })

        .catch((error) => {
          console.log('Error uploading file:', error);
          // Handle any errors related to file upload
        });

      }


 // clearing all input feild
 signup_fname.value = ''
 signup_lname.value = ''
 signup_email.value = ''
 signup_password.value = ''
 signup_image.value = ''



