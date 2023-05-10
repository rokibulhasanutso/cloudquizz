import { timmingFormat } from "../timmingFormat.js";
import { getAuth, quizList, addScore } from "../firebase/database-setting.js";
import { isAuthenticated } from "../auth/auth.js";



// score increment and send databae section 
let scoreRight = 0, scoreWrong = 0, totalScore = 0;

// this function get data from database
(async function() {
    
    let data = await getAuth(localStorage.getItem('app_login_id'));
    // document.querySelector('.quiz_ownership').children[1].children[0]
    
    document.querySelectorAll('.db_user-name').forEach(name => {
        name.innerHTML = data.name;
    })
    document.querySelectorAll('.db_username').forEach(username => {
        username.innerHTML = data.username;
    })

    // this condition use for check user have authenticate or not
    // if user authenticated then use to score user database otherways not.
    if(isAuthenticated()) {
        scoreRight = data.rightScore === undefined ? 0 : data.rightScore;
        scoreWrong = data.wrongScore === undefined ? 0 : data.wrongScore;
        totalScore = scoreRight + scoreWrong;
        document.querySelector('.score_details .right_quiz').innerText = scoreRight;
        document.querySelector('.score_details .wrong_quiz').innerText = scoreWrong;
        document.querySelector('.score_details .total_quiz').innerText = totalScore;
    }
})();

const efficiencyArr = [];
document.querySelector('.score_details .right_quiz').innerText = scoreRight;
document.querySelector('.score_details .wrong_quiz').innerText = scoreWrong;
document.querySelector('.score_details .total_quiz').innerText = totalScore;
// score increment and send databae section end 


// quiz count down time oparetions funtion
let countTime;
const countDownTime = count => {
    const countTimeContainer = document.querySelector('.time_count_down');
    countTimeContainer.innerHTML = timmingFormat(count); // show the fist count dwon number
    document.querySelector('.main-content').style.borderColor = '';
    document.querySelector('.submition-btn button').style.cssText = '';

    countTime = count;
    quizEfficiency(countTime)
    let timeIntervalID = setInterval(() => {
        countTime--
        quizEfficiency(countTime)
        countTimeContainer.innerText = timmingFormat(countTime);

        if(countTime <= 5 && countTime > 0) {
            document.querySelector('.main-content').style.borderColor = 'red';
            document.querySelector('.submition-btn button').style.cssText = `
                pointer-events: none;
                background-color: #2b9348;
            `
        } else if (countTime === 0) {
            document.querySelector('.quiz-score-overview').style.display = 'flex';
            document.querySelector('.quiz-score-overview .status').innerText = 'Timeout...!';
            clearInterval(timeIntervalID);
        }
    }, 1000);

    return timeIntervalID;
}
// countDownTime(15);

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
let coDoTiInterval, requieQuizTime; // couse for you can acceess or stop intervel outside of randonQuizGame() function
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
        requieQuizTime = 15;
        coDoTiInterval = countDownTime(requieQuizTime); // count down time start for 15 second
        document.querySelector('.quiz_content').innerHTML = addQuizContent; // add quiz from database
        document.querySelector('.submition-btn').style.display = 'flex'; // submisstion button show when had quiz
        document.querySelector('.quiz_details_content').style.display = 'flex'; // show count down time and scores
    }

    // quiz test function ensure that right or wrong
    const allOptionContainer = document.querySelectorAll('.options-content p');

    allOptionContainer.forEach(optionContainer => {
        optionContainer.addEventListener('click', () => {
            if (optionContainer.innerText === currectAns) {
                scoreRight++
                document.querySelector('.score_details .right_quiz').innerText = scoreRight;
                document.querySelector('.score .right_quiz').innerText = scoreRight;
                avarageEfi();

                optionContainer.style.cssText = `
                    color: white;
                    background-color: #36c15d;
                    border-color: transparent;
                `;
            } else {
                scoreWrong++
                document.querySelector('.score_details .wrong_quiz').innerText = scoreWrong;
                document.querySelector('.score .wrong_quiz').innerText = scoreWrong;

                optionContainer.style.cssText = `
                    color: white;
                    background-color: red;
                    border-color: transparent;
                `;
                allOptionContainer.forEach(element => {
                    if (element.innerText === currectAns) {
    
                        element.style.cssText = `
                            color: white;
                            background-color: #36c15d;
                            border-color: transparent;
                        `;
                    }
                })
            }
            totalScore++

            // when user authenticated then score adding otherways not
            if (isAuthenticated()) {
                addScore(localStorage.getItem('app_login_id'), scoreRight, scoreWrong)
                .then(() => {
                    console.log('data send!');
                });
            }
            
            document.querySelector('.score_details .total_quiz').innerText = totalScore;
            document.querySelector('.score .total_quiz').innerText = totalScore;
            allOptionContainer.forEach(element => { element.style.pointerEvents = 'none' });

            clearInterval(coDoTiInterval);

            document.querySelector('.submition-btn .skip').style.display = 'none';
            document.querySelector('.submition-btn div').style.display = 'block'; 

            document.querySelector('.quiz-score-overview .eficiency_view').innerHTML = `
                <p>Time efficiency -> ${avarageArr === undefined ? intPSEU : avarageArr} %</p>
                <p>Quiz efficiency -> ${((100 / totalScore) * scoreRight) === NaN ?  0 : parseInt((scoreRight * (100/totalScore)))} %</p>
            `;
        })
    })
}
randonQuizGame(); // automatic start quiz after page load
// quiz option and currection function end


var avarageArr; // this var variable declearation is use for assign before use variable
var intPSEU; // PSEU = per second efficiency update
function quizEfficiency(runCountTime) {
    intPSEU = parseInt((100 / requieQuizTime) * runCountTime);
    if (efficiencyArr.length > 0 ) {
        let arrSum = 0;
        for (let arr of efficiencyArr) { 
            arrSum += arr;
        };
        avarageArr = parseInt((arrSum + intPSEU) / (efficiencyArr.length + 1));
        document.querySelector('.time_avarage span').innerText = `${avarageArr} %`;
    } else {
        document.querySelector('.time_avarage span').innerText = `${intPSEU} %`;
    }
}
function avarageEfi() {
    efficiencyArr.push(intPSEU);
}


// button click functionalities or oparetions
document.querySelector('.submition-btn .skip').addEventListener("click", (event)=> {
    clearInterval(coDoTiInterval);
    randonQuizGame();
    // console.log('clicked!')
})

document.querySelector('.submition-btn .next').addEventListener("click", (event)=> {
    clearInterval(coDoTiInterval);
    document.querySelector('.submition-btn div').style.display = 'none';
    randonQuizGame();
    // console.log('clicked!')
})

document.querySelector('.submition-btn .close').addEventListener("click", (event)=> {
    document.querySelector('.quiz-score-overview').style.display = 'flex';
    document.querySelector('.quiz-score-overview .status').innerText = 'Your score overview...!';
    document.querySelector('.time_count_down').innerText = '--:--';
})

document.querySelector('#quiz_startAgainBtn').addEventListener("click", (event)=> {
    document.querySelector('.quiz-score-overview').style.display = 'none';
    document.querySelector('.submition-btn div').style.display = 'none';
    randonQuizGame();
    // console.log('clicked!')
})