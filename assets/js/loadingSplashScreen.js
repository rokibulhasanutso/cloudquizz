import { countDownTime } from "./user/quiz_test.js"

// loading function start
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
