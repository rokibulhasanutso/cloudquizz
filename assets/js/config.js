
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
  import { 
    getFirestore, collection, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, deleteField
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

// export const usersCollectionRef = collection(db, 'app-user');
// export const appUser = doc(db, 'app-user/alovelace');

export async function getUserDetails() {
  let ref, docSnap;

  ref = doc(db, "app-user", "EeDTL2YuHaQqxQELVg6n");
  docSnap = await getDoc(ref);

  // console.log(ref);
  console.log(docSnap.data().username);
}



