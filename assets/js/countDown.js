
let countDown = document.querySelector('.quiz-sart-count-down');
let count = 3;

export const counting = setInterval(()=> {
        countDown.innerHTML = `<span>${count}</span>`;
        count--;

        if (count < 0) {
            countDown.style.display = 'none';
            clearInterval(counting)
        }
        
    }, 1000);


