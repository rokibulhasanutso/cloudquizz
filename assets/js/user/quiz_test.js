import { timmingFormat } from "../timmingFormat.js";

// quiz time counting funtion start
export function countDownTime(countTime){
    let timeElement = document.querySelector('.time_count_down');
    timeElement.innerText = timmingFormat(countTime);
    const countDownTime = setInterval(() => {
        countTime--
        
        if (countTime < 0) {
            clearInterval(countDownTime)
        }else{
            timeElement.innerText = timmingFormat(countTime);
        }
    }, 1000);
}
// quiz time counting funtion end

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