import { isAuthenticated } from "./auth.js"

let indexUrl = '/cloudquizz/';
let loginUrl = '/cloudquizz/templates/user/login.html';
let regiUrl = '/cloudquizz/templates/user/registetion.html';
const quizTest = '/cloudquizz/templates/user/quiz_test.html';
export let profileUrl = '/cloudquizz/templates/user/profile.html';
let currentUrl = window.location.pathname;


export const redirectTo = url => {
    window.location.replace(url);
}


if (isAuthenticated()) {

    if ( currentUrl === loginUrl || currentUrl === regiUrl) {
        redirectTo(profileUrl)
        document.querySelector('body').style.display = 'block';
    } else {
        // redirectTo(profileUrl)
        console.log('else...')
        document.querySelector('body').style.display = 'block';
    }

}else {
    if (
        currentUrl === regiUrl ||
        currentUrl === quizTest ||
        currentUrl === indexUrl
    ){}
    else if (currentUrl !== loginUrl) {
        redirectTo(loginUrl);
    }
}
