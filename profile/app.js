import { auth,
  onAuthStateChanged,
   signOut,
   doc,            
   addDoc, 
   getDocs,
   deleteDoc,
   setDoc,   
   collection,
   db,
   query,
   where,
   getAuth,
   updateProfile 
   } 
from "../utils/firebaseSetup.js";

// -------------------------------------------------------------------------------

//to update user profile
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePic = document.getElementById("profilePic");
const logout_btn = document.getElementById("logout_btn");

//to take todo input
var todoText = document.getElementById('todoText')
var todoDropdown = document.getElementById('todoDropdown')
var todoDuedate = document.getElementById('todoDuedate')
var addTodoBtn = document.getElementById('addTodoBtn')

//to update todo list
var todoDisplayBox = document.getElementById('todoDisplayBox')
// to edit profile
var edit_btn = document.getElementById('edit_btn')

// --------------------------------------------------------------------------------- 

//auth.currentUser.email ----- current user id is saved in auth -> currentUser ->email


//updat user profile
try {
  const querySnapshot = await getDocs(collection(db, "usersProfile"));
  querySnapshot.forEach((doc) => {

    //cheching current user profile info
    if (auth.currentUser.email === doc.data().userEmail) { //here if work here as a filter to get only cuurent user todos
    profileName.innerText = doc.data().userName;
    profileEmail.innerText = doc.data().userEmail;  
    profilePic.innerHTML = ` <img src=${doc.data().userImage} alt="profile pic"></img> `

    }//end of if
    
    // else {console.log('not found');}

  })   //end of for each loop
} 
catch (e) {
  console.error("Error adding document: ", e);
}


getCurrentUserTodo(auth.currentUser.email)  //update todo list after login

//to add TODO
addTodoBtn.addEventListener('click',()=>{
  if (!todoText.value || !todoDropdown.value || !todoDuedate.value) 
    { return alert("fill all field"); } 
   
    //if input feiled are correctly fill so this block will proceed
  else {
    try {
      const todoItemRef = addDoc(collection(db, "usersTODO"), {
      currentUserId : auth.currentUser.email,
      todo_Text: todoText.value,
      todo_Dropdown: todoDropdown.value,
      todo_Duedate: todoDuedate.value
      })
      getCurrentUserTodo(auth.currentUser.email) //update todo list after adding todo
      } 
    catch (e) {console.error("Error adding document: ", e);}
  }
  todoText.value = ''
  todoDropdown.value=''
  todoDuedate.value = ''
});


//get todos (getDocs) ______________________________________________________
async function getCurrentUserTodo(userId) {
  try {
    todoDisplayBox.innerHTML ='';
    const querySnapshot = await getDocs(query(collection(db, "usersTODO"), where("currentUserId", "==", userId)));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
     
      var dueDate_till_today = calculating_remaing_days_in_due_date(doc.data().todo_Duedate)


      var li = `<li>
      <span> ${doc.data().todo_Dropdown}</span> 
      <span> ${doc.data().todo_Text}</span> 
      <span> Due date : ${doc.data().todo_Duedate}</span> 
      <span>status <hr> ${dueDate_till_today}</span> 
      <span> <button id = ${doc.id} onclick = "deleteEvent(this)"> Delete </button> </span>
      </li>`;
      // <span> Due date : ${doc.data().todo_Duedate} <hr> ${dueDate_till_today} </span>

     
      // todo_display_list.innerHTML += li;})
      window.deleteEvent = deleteEvent;
      todoDisplayBox.innerHTML += li;
    
    })
  }
  catch (err) {
    alert(err);
  }
} 


//delete doc __________________________________________________________
async function deleteEvent(element) {
  // console.log(element.id);
  // console.log(auth.currentUser.email);

  const docRef = doc(db, "usersTODO", element.id);
  await deleteDoc(docRef);
  getCurrentUserTodo(auth.currentUser.email)
}


//logout function ____________________________________________________
logout_btn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.");
      location.href = "../auth/signin/index.html";
    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});


//Function calculating remaing days in due date__________________________
function   calculating_remaing_days_in_due_date(dateee)
{
  var new_remainder;
  var today_date;
  var remaining_days_till_today;

  // console.log(dateee);
   new_remainder = new Date(dateee)

   today_date = new Date();
  
 new_remainder = new_remainder - today_date;
  new_remainder = Math.floor(new_remainder / 1000 / 60 / 60 / 24); 
//  console.log(new_remainder);

 if(new_remainder > 0){
   remaining_days_till_today = new_remainder +" days left"
  return remaining_days_till_today;
 }
 else if (new_remainder == -1 && today_date.getHours()<24){ 
   remaining_days_till_today = "Last day"
  return remaining_days_till_today;
 }
 else if (new_remainder < 0){ 
   remaining_days_till_today = "Due date lapsed"
  //  todoDisplayBox.style.color = 'green'
  return remaining_days_till_today;
 }
}
  // _________________ End of return Function to calculating remaing days in due date_____________________

//   edit_btn.addEventListener('click',()=>{
//   // import { getAuth, updateProfile } from "firebase/auth";
// const auuth = getAuth();
// console.log(auuth.currentUser);
// updateProfile(auuth.currentUser, {
//   displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
// }).then(() => {
//   // Profile updated!
//   // ...
// }).catch((error) => {
//   // An error occurred
//   // ...
// });

// })

