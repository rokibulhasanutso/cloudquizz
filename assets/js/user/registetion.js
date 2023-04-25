// imports start
import { querySnapshot, addUser } from "../firebase-config/config.js"
// imports end

// submission inputs 
let loginInputs = document.querySelector('.login_inputs');
// document to inputs
let userName = document.querySelector('#user_name');
let mobileNumber = document.querySelector('#user_mobile_number');
let userPassword = document.querySelector('#user_pass');
let userConfirmPassword = document.querySelector('#user_confirm_pass');
let userSignUpBtn = document.querySelector('.user_login_btn');

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


// mobile number checking function
// database mobileNumber data start 
const serverMblNbr = []
querySnapshot.forEach(doc => { serverMblNbr.push(doc.data().mobileNumber) });
// database mobileNumber data start end

let varifyMobileNumber;
mobileNumber.addEventListener('keyup', function() {
    const matchingNumber = serverMblNbr.includes(mobileNumber.value);
    const haveCheckIcon = mobileNumber.nextElementSibling;
    if(mobileNumber.value === '' || matchingNumber === true){
        if (matchingNumber == true) errorMessage('This mobile number has been used.');
        mobileNumber.style.borderBottomColor = 'red';
        if (haveCheckIcon !== null) haveCheckIcon.remove();
    }
    else{
        if (haveCheckIcon === null) {
            if ((mobileNumber.value).length == 11) {
                mobileNumber.style.borderBottomColor = '#2b9348';
                const checkIcon = document.createElement('span');
                checkIcon.style.cssText = `right: 0; color: #2b9348;`;
                checkIcon.innerHTML = `<i style="font-weight: bold;" class='bx bx-check'></i>`;
                mobileNumber.insertAdjacentElement('afterend', checkIcon);
                varifyMobileNumber = mobileNumber.value;
            }
        } else {
            haveCheckIcon.remove();
            varifyMobileNumber = undefined;
        }

        // check digit more then 11
        if ((mobileNumber.value).length > 11){
            errorMessage('Please enter correct mobile number.');
            mobileNumber.style.borderBottomColor = 'red';
        } else errorMessage("!remove");
    }
});

// password checking function
const passwordMatching = () => {
    if (userPassword.value == '' || userConfirmPassword.value == ''){
        errorMessage('Password doesn\'t match');
        userPassword.style.borderBottomColor = 'red';
        userConfirmPassword.style.borderBottomColor = 'red';
    }
    else{
        if (userPassword.value === userConfirmPassword.value) {
            userPassword.style.borderBottomColor = '';
            userConfirmPassword.style.borderBottomColor = '';
            return userPassword.value;
        }else{
            errorMessage('Password doesn\'t match');
            userPassword.style.borderBottomColor = 'red';
            userConfirmPassword.style.borderBottomColor = 'red';
        }
    }
}

// registration submition function
userSignUpBtn.addEventListener('click', function() {

    console.log(window.location.host)

    const varifyPassword = passwordMatching();

    if (
        userName.value !== '' &&
        varifyMobileNumber !== undefined &&
        varifyPassword !== undefined
    ) {
        document.write('Get: register successfully! ')


        const username = generateUsername(userName.value);
        addUser(username, varifyPassword, userName.value, mobileNumber.value);

        // window.location.href = 'http://127.0.0.1:5500/main/templates/user/login.html'

        function generateUsername(name){
            // database username data start
            const usernameData = [];
            querySnapshot.forEach(doc => { usernameData.push(doc.data().username) }); 
            // database username data end 

            let username = name.toLowerCase().replace(/[^a-z0-9]/g, '');
            let joinNumber = 1;
            while (true) {
                if (usernameData.includes(username) === true) {
                    username = username.replace((joinNumber-1).toString().padStart(2, '0'), '');
                    username += joinNumber.toString().padStart(2, '0');
                    joinNumber++
                }else{
                    return username
                }
            }
        }
    }
    else{
        if(userName.value === ''){
            userName.style.borderBottomColor = 'red';
        }else{
            userName.style.borderBottomColor = '';
        }

        if(varifyMobileNumber === undefined){
            mobileNumber.value = '';
            mobileNumber.style.borderBottomColor = 'red';
        }

        userPassword.value = '';
        userConfirmPassword.value = '';

        if (userName.value === '' || varifyMobileNumber === undefined){
            errorMessage('Did not complete fill up.')
        }
    }  
});