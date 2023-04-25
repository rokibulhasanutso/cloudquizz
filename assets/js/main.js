// import { counting } from "./countDown.js"; 
import { timmingFormat } from './timmingFormat.js';
import { querySnapshot } from './firebase-config/config.js';
// import * as regitrationData from './user/registetion.js'

// loading function start
const loadElement = document.querySelector("body")
const loadingElement = document.querySelector(".loading")
const loadingRange = document.querySelector(".loading_range")

// loadingRange.style.width = '20%';
let startTime = window.performance.now()
window.onload = function myFunction() {
    let endTime = window.performance.now();
    let loadingTime = endTime - startTime;
    console.log(loadingTime)
    loadingRange.style.width = `${loadingTime.toString().slice(0,2)}%`;
    setTimeout(function () {
        loadingRange.style.width = '100%';
        setTimeout(function () {
            loadingElement.style.display = 'none';
            // counting;
            countDownTime(120)
        }, 100)
    }, loadingTime)
}
// loading function end


function countDownTime(countTime){
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


// firebase database section 

querySnapshot.forEach(doc => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
});
