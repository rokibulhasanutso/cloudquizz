import { isAuthenticated } from "../auth/auth.js";
 

if (isAuthenticated()) {
    document.querySelector('.with_login').style.display = "flex";
    document.querySelector('.with_out_login').style.display = "none";
}

