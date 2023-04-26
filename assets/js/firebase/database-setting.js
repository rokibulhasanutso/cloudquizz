import { fs } from "./config.js"; // fs meanning is firebase firestore

// setting database or connecting 
const db = fs.getFirestore();
const userRef = fs.collection(db, 'app-user');
export const querySnapshot = await fs.getDocs(userRef);
// export const querySnapshot = 150;

// database add user function start
export async function addUser(username, password, name, mobileNumber) {
  try {
    await fs.setDoc(fs.doc(userRef, username), {
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

// database auth function check user start
export async function getAuth(username) {
  try {
    const docSnap = await fs.getDoc(fs.doc(db, 'app-user', username));

    if (docSnap.exists()) {
      return docSnap.data();
    }else{
      console.log('user not found');
    }
  } catch (error) {
    console.log(error);
  }
}
// database auth function check user end