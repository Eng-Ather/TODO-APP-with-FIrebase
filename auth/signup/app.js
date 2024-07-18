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

console.log(signup_image.file);



signup_btn.addEventListener("click", () => {
  
 if (!signup_email.value || !signup_password.value || !signup_fname.value
 || !signup_lname.value ) 
 { return alert("fill all field"); } 

 //if input feiled are correctly fill so this block will proceed
else 
{
    //collect user info in an object so it can be easily store in firebase db
    var userInfo_Object=
    {
     userName: `${signup_fname.value} ${signup_lname.value }`,
     userEmail: signup_email.value,
     userPassword : signup_password.value,
   };
  
    // ************** (to create account in firestore )**********************
    createUserWithEmailAndPassword(auth, signup_email.value, signup_password.value)
    
    //if Signed up 
      .then((userCredential) =>{              
       console.log('user : ', userCredential.user.uid);

        //to upload image
        const userImageRef = ref(storage, `images/${signup_image.files[0].name}`)
        uploadBytes(userImageRef, signup_image.files[0])  // Upload the file to the storage reference
        .then((snapshot) =>{
          console.log('Uploaded a file to storage!');
        
           //down load image url
            getDownloadURL(userImageRef)       
            .then((url) => {
              userInfo_Object.userImage = url;
             console.log(userInfo_Object);
             
              // created user collection --> document reference
              const userDbRef = doc(db, "usersProfile", userCredential.user.uid);
              // set this collection --> document to db
              setDoc(userDbRef, userInfo_Object).then(() => {
              console.log("User info Object Updated into DB with name userProfile");});
                        
            });
         })
     .catch((error) => {console.log('Error uploading file:', error); });
        
      // clearing all input feild
      signup_fname.value = ''
      signup_lname.value = ''
      signup_email.value = ''
      signup_password.value = ''
      signup_image.value = ''  
      // console.log(`user signup successfully! \n  user-id: ${user.email}`);

    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);});
 }
// location.href = "../signin/index.html";   

});

 // clearing all input feild
 signup_fname.value = ''
 signup_lname.value = ''
 signup_email.value = ''
 signup_password.value = ''
 signup_image.value = ''
