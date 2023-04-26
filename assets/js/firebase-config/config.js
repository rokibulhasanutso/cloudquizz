
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
  import { 
    getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, deleteField
  } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCPpc8ZJfr--4rX3T_2tdyfZ5BUzbP6nNU",
    authDomain: "cloudquizz-7ac86.firebaseapp.com",
    projectId: "cloudquizz-7ac86",
    storageBucket: "cloudquizz-7ac86.appspot.com",
    messagingSenderId: "1076369402839",
    appId: "1:1076369402839:web:a75db9b6b132adeb21b992"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const userRef = collection(db, 'app-user');
export const querySnapshot = await getDocs(userRef);


// database add user function start
export async function addUser(username, password, name, mobileNumber) {
  try {
    await setDoc(doc(userRef, username), {
      username, 
      name, 
      mobileNumber, 
      password,
    });
  } catch (error) {
    console.log('form adding user to database: ', error);
  }
}
// database add user function end

export async function getAuth(username) {
  try {
    const docSnap = await getDoc(doc(db, 'app-user', username));

    if (docSnap.exists()) {
      return docSnap.data();
    }else{
      console.log('user not found');
    }
  } catch (error) {
    console.log(error);
  }
}






