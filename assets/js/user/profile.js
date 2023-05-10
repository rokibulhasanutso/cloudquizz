import { getAuth, addQuiz, quizList } from "../firebase/database-setting.js";

let data;
(async function() {
    data = await getAuth(localStorage.getItem('app_login_id'));
    // document.querySelector('.quiz_ownership').children[1].children[0]
    
    document.querySelectorAll('.db_user-name').forEach(val => {
        val.innerHTML = data.name;
    })
    document.querySelectorAll('.db_username').forEach(val => {
        val.innerHTML = data.username;
    })

    // total right answer 
    document.querySelectorAll('.db_rightScore').forEach(val => {
        if (data.rightScore) {
            val.innerHTML = data.rightScore;
        } else {
            val.innerHTML = 0;
        }
        
    })

    // total wrong answer 
    document.querySelectorAll('.db_wongScore').forEach(val => {
        if (data.wrongScore) {
            val.innerHTML = data.wrongScore;
        } else {
            val.innerHTML = 0;
        }
    })

    // total answer 
    if (
        data.rightScore !== undefined &&
        data.wrongScore !== undefined
    ) {
        document.querySelector('.score .totalScore').innerText = data.rightScore + data.wrongScore;
    } else {
        document.querySelector('.score .totalScore').innerText = 0;
    }


    // total posted quiz 
    let totalQuiz = 0;
    quizList.forEach(doc => { if (doc.data().username === localStorage.getItem('app_login_id')) { totalQuiz++ }})
    document.querySelector('.total_postQuiz').innerText = totalQuiz;

})();



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
    // console.log(popupContentBox.offsetHeight)
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

// popup Content Box input send to database start
const feedbackMsg = document.querySelector('#popup_errormsg');
const submittionBtn = document.querySelector('.submit');

submittionBtn.addEventListener('click', () => {
    const userid = localStorage.getItem('app_login_id');
    const qst = document.querySelector('#db-qst').value;
    const op1 = document.querySelector('#db-op1').value;
    const op2 = document.querySelector('#db-op2').value;
    const op3 = document.querySelector('#db-op3').value;
    const op4 = document.querySelector('#db-op4').value;

    submittionBtn.style.setProperty('user-select','none');
    if (
        qst !== "" &&
        op1 !== "" &&
        op2 !== "" &&
        op3 !== "" &&
        op4 !== ""
    ){
        addQuiz(userid, qst, op1, op2, op3, op4)
        .then(() => {
            feedbackMsg.innerHTML = 'Add question successfully!';
        })
    } else {
        feedbackMsg.innerHTML = 'Please fillup all box\'s';
    }
})


textareas.forEach(textarea => {
    textarea.addEventListener('keydown', () => {
        feedbackMsg.innerHTML = '';
    })
})


// popup Content Box input send to database end 



// quizList.forEach(doc => {
//     console.log(`${doc.id} => ${doc.data()}`)
//     console.log(doc.data())
// })


const postArea = document.querySelector('#posted_quizes');

function db_quizContent() {
    quizList.forEach(doc => {
        if (doc.data().username === localStorage.getItem('app_login_id')) {
            const divElmt = document.createElement('div');

            divElmt.innerHTML = `
                <div class="quiz_content">
                    <div class="question-content" style="display: flex;">
                        <p>Question:</p>
                        <p>${doc.data().question}</p>
                    </div>
                    <p style="font-size: 15px; margin-bottom: 18px;">Choose your curect answer:</p>
                    <div class="options-content">
                        <p style="color: white; background-color: #36c15d; border-color: transparent;">
                            ${doc.data().option01}
                        </p>
                        <p>${doc.data().option02}</p>
                        <p>${doc.data().option03}</p>
                        <p>${doc.data().option04}</p>
                    </div>
                </div>
            `// end innerHTML

            postArea.appendChild(divElmt);
        }
    })
}
db_quizContent()