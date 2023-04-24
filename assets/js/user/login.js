let userName = document.querySelector('#user_name');
let userPassword = document.querySelector('#user_pass');
let passwordEye = document.querySelector('#pass_eye');
let userLoginBtn = document.querySelector('.user_login_btn');

passwordEye.addEventListener('mousedown', function() {
    passwordEye.style.color = 'transparent';
    userPassword.type = 'text';
});
window.addEventListener('mouseup', function() {
    passwordEye.style.color = '';
    userPassword.type = 'password';
});
userLoginBtn.addEventListener('click', function() {
    userName.value = '';
    userName.style.borderBottomColor = 'red';
    userPassword.value = '';
    userPassword.style.borderBottomColor = 'red';
});