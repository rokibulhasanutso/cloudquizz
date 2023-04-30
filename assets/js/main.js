import { logout, isAuthenticated } from "../../assets/js/auth/auth.js";


let logoutbtn = document.querySelector('.logout-btn');

logoutbtn.addEventListener('click', () => logout())


if (isAuthenticated()) {
    document.querySelector('.with_login').style.display = "flex";
    document.querySelector('.with_out_login').style.display = "none";
}