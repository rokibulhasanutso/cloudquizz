import { getAuth } from "../firebase/database-setting.js";

(async function() {
    
    let data = await getAuth(localStorage.getItem('app_login_id'));
    // document.querySelector('.quiz_ownership').children[1].children[0]
    
    document.querySelectorAll('.db_user-name').forEach(name => {
        name.innerHTML = data.name;
    })
    document.querySelectorAll('.db_username').forEach(username => {
        username.innerHTML = data.username;
    })
})()