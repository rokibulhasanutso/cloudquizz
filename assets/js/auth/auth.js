import { redirectTo } from "./path_auth.js";

export function isAuthenticated() {
    let sotred = localStorage.getItem('app_login_id');
    if(sotred) {
        return true
    } else {
        return false
    }
}

export function login(loginID) {
    localStorage.setItem('app_login_id', loginID)
}

export function logout() {
    
    localStorage.removeItem('app_login_id')
    redirectTo('/cloudquizz')
    console.log("work")
    
}

