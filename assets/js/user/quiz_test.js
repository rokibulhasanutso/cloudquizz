import { timmingFormat } from "../timmingFormat.js";
import { getAuth, quizList } from "../firebase/database-setting.js";


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

// quiz time counting funtion start
// export function countDownTime(countTime){
//     // let timeElement = document.querySelector('.time_count_down');
//     // timeElement.innerText = timmingFormat(countTime);
//     const countDownTime = setInterval((countTime) => {
//         countTime--
        
//         if (countTime < 0) {
//             clearInterval(countDownTime)
//         }else{
//             return timmingFormat(countTime);
//         }
//     }, 1000);
// }
// countDownTime(120) // for test
// quiz time counting funtion end
 

const countDownTime = countTime => {
    const countTimeContainer = document.querySelector('.time_count_down');
    countTimeContainer.innerHTML = timmingFormat(countTime);
    
    let timeIntervalID = setInterval(() => {
        countTime--

        if (countTime < 0) {
            clearInterval(timeIntervalID);
        } else {
            countTimeContainer.innerText = timmingFormat(countTime);
        }
    }, 1000);

    return timeIntervalID;
}



// count down screen start
let countDown = document.querySelector('.quiz-sart-count-down');
let count = 3;

export const counting = setInterval(()=> {
    countDown.innerHTML = `<span>${count}</span>`;
    count--;

    if (count < 0) {
        countDown.style.display = 'none';
        clearInterval(counting);
    }  
}, 1000);
// count down screen end

// random number creation 
function randomNumber(start, end) {
    if (end === undefined){
        end = start;
        start = 0;
    } 
    return Math.floor(Math.random() * end) + start;
}
// end random number creation 

// quiz option and currection function start
let coDoTiInterval;
function randonQuizGame() {
    const randArr = [];

    while (true) {
        if (randArr.length >= 4) {
            break;
        } else {
            let randN = randomNumber(4); // random between 4 numbers
            if (!randArr.includes(randN)) {
                randArr.push(randN);
            }
        }
    }
    // console.log(randArr)
    const allQuizes = [];
    quizList.forEach(doc => { allQuizes.push(doc.data()) }); // Import data from database

    const db_quiz = allQuizes[randomNumber(allQuizes.length -1)];
    let currectAns = db_quiz.option01;

    if (db_quiz) {
        const optionsArr = [db_quiz.option01, db_quiz.option02, db_quiz.option03, db_quiz.option04];

        const addQuizContent = `
            <div class="question-content">
                <span>Question:</span>
                <span>${db_quiz.question}</span>
            </div>
            <p style="font-size: 15px; margin-bottom: 18px;">Choose your curect answer:</p>
            <div class="options-content">
                <p>${optionsArr[randArr[0]]}</p>
                <p>${optionsArr[randArr[1]]}</p>
                <p>${optionsArr[randArr[2]]}</p>
                <p>${optionsArr[randArr[3]]}</p>
            </div>
        `
        coDoTiInterval = countDownTime(15);
        document.querySelector('.quiz_content').innerHTML = addQuizContent;
    }

    // quiz test function ensure that right or wrong
    const allOptionContainer = document.querySelectorAll('.options-content p');

    allOptionContainer.forEach(optionContainer => {
        optionContainer.addEventListener('click', () => {
            if (optionContainer.innerText === currectAns) {
                optionContainer.style.cssText = `
                    color: white;
                    background-color: #36c15d;
                    border-color: transparent;
                `;
            } else {
                optionContainer.style.cssText = `
                    color: white;
                    background-color: red;
                    border-color: transparent;
                `;
            }

            allOptionContainer.forEach(element => {
                if (element.innerText === currectAns) {

                    element.style.cssText = `
                        color: white;
                        background-color: #36c15d;
                        border-color: transparent;
                    `;
                }
                element.style.pointerEvents = 'none';
            })
        })
    })
}
// quiz option and currection function end

randonQuizGame();






// function afterQuizOverView() {
//     const allOptionContainer = document.querySelectorAll('.options-content p')
// }

document.querySelector('.skip-btn button').addEventListener("click", (event)=> {
    clearInterval(coDoTiInterval)
    randonQuizGame();
    console.log('clicked!')
})