// imports all data accessable methods from firebase database
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { 

    getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, deleteField

  } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-firestore.js";
// imports end

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCPpc8ZJfr--4rX3T_2tdyfZ5BUzbP6nNU",
//     authDomain: "cloudquizz-7ac86.firebaseapp.com",
//     projectId: "cloudquizz-7ac86",
//     storageBucket: "cloudquizz-7ac86.appspot.com",
//     messagingSenderId: "1076369402839",
//     appId: "1:1076369402839:web:a75db9b6b132adeb21b992"
// };

const firebaseConfig = {
  apiKey: "AIzaSyC1ONNFWkDiDbD4_dVPtA1YCzkPbPxwYsA",
  authDomain: "cloudquiz-53c38.firebaseapp.com",
  projectId: "cloudquiz-53c38",
  storageBucket: "cloudquiz-53c38.appspot.com",
  messagingSenderId: "167785173652",
  appId: "1:167785173652:web:1e20a30842dde51be35a81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// fs meaning is firestore
// export for easy manage at database settings files
export const fs = {
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  deleteField
}
// export end


