import { querySnapshot, getAuth } from "../firebase/database-setting.js"
import { isAuthenticated, login } from "../auth/auth.js";
import { redirectTo } from "../auth/path_auth.js";


let loginInputs = document.querySelector('.login_inputs');

let userName = document.querySelector('#user_name');
let userPassword = document.querySelector('#user_pass');
let passwordEye = document.querySelector('#pass_eye');
let userLoginBtn = document.querySelector('.user_login_btn');

// password eye 
passwordEye.addEventListener('mousedown', function() {
    passwordEye.style.color = 'transparent';
    userPassword.type = 'text';
});
window.addEventListener('mouseup', function() {
    passwordEye.style.color = '';
    userPassword.type = 'password';
});

// submit 
userLoginBtn.addEventListener('click', function() {

    authticate(userName.value, userPassword.value);

    userName.value = '';
    userName.style.borderBottomColor = 'red';
    userPassword.value = '';
    userPassword.style.borderBottomColor = 'red';
});


// authentication data
async function authticate(inputUsername, inputPassword) {
    const data = await getAuth(inputUsername);

    if(data) {
        if (inputUsername === data.username && inputPassword === data.password) {
            login(data.username)
            redirectTo(`/cloudquizz/templates/user/profile.html`);
        }
        else errorMessage("username or password invalid!");
    }
}


// showing error massages
const errorMessage = errMsg => {
    let preElement = loginInputs.previousElementSibling;
    if (errMsg === "!remove"){
        if (preElement.nodeName == 'P') preElement.remove();
    }else{
        if (preElement.nodeName == 'P') preElement.remove();

        const errMsgElement = document.createElement('p');
        errMsgElement.style.cssText = `
            text-align: end; 
            margin-top: -34px; 
            margin-bottom: 15px; 
            color: crimson; 
            font-size: 16px;
        `;
        errMsgElement.innerText = errMsg;
        loginInputs.insertAdjacentElement('beforebegin', errMsgElement);
    }
}
