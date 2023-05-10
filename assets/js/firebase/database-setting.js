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

// database score upadate quiz function 
export async function addScore(username, right, wrong) {
  try {
    await fs.updateDoc(fs.doc(userRef, username), {
      rightScore : right,
      wrongScore : wrong,
    });
  } catch (error) {
    console.log('form adding user to database: ', error);
  }
}
// database score quiz function end


// database auth function check user start
export async function getAuth(username) {
  try {
    const docSnap = await fs.getDoc(fs.doc(db, 'app-user', username));

    if (docSnap.exists()) {
      return docSnap.data();
    }else{
      // console.log('db-msg: user not found');
    }
  } catch (error) {
    console.log(error);
  }
}
// database auth function check user end


// database add/view quiz function start
const quizref = fs.collection(db, 'quiz-list');

// adding quiz function
export async function addQuiz(username, question, option01, option02, option03, option04) {
  try {
    await fs.setDoc(fs.doc(quizref), {
      username,
      question, 
      option01, 
      option02, 
      option03, 
      option04
    })
  } catch (error) {
    console.log('form adding quiz to database: ', error);
  }
}

// quiz get all quiz function
export const quizList = await fs.getDocs(quizref);
// database add/view quiz function end