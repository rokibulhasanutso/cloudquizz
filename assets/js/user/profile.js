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






// popup section start
const popupBox = document.querySelector('.popup');
const popupShowBtn = document.querySelector('.post-create-btn');
const popupCloseBtn = document.querySelector('.popup-close-btn');
const popupContentBox = document.querySelector('.create-quiz-popup');
const textareas = document.querySelectorAll('.making_question_content .textarea textarea');


popupShowBtn.addEventListener('click', () => {
    popupBox.style.display = 'flex';

})
popupCloseBtn.addEventListener('click', () => {
    popupBox.style.display = 'none';
})

textareas.forEach(textarea => {
    textarea.addEventListener('click', () => {
        textareas.forEach(othersTextarea => {
            othersTextarea.parentElement.style.borderColor = "#dedede";
        })
        textarea.parentElement.style.borderColor = "#36c15d";
    })
})

window.addEventListener('keyup', () => {
    const popupReHeight = popupBox.offsetHeight - 60;
    console.log(popupContentBox.offsetHeight)
    if (popupContentBox.offsetHeight >= popupReHeight) {
        popupContentBox.style.height = popupContentBox.offsetHeight + "px";
        popupContentBox.style.overflowY = "scroll";
    }else {
        popupContentBox.style.overflowY = "hidden";
    }
})

textareas.forEach(textarea => {
    textarea.addEventListener('keyup', event => {
        textarea.style.height = "30px";
        let scrHeight = event.target.scrollHeight;
        textarea.style.height = `${scrHeight}px`;
    
        if (textarea.offsetHeight >= 200 ) {
            textarea.style.overflowY = 'scroll';
        }
    });
})
// popup section end




