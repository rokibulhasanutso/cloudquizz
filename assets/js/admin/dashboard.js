const textarea1 = document.querySelectorAll('.making_question_content .textarea');
const textarea = document.querySelectorAll('.making_question_content .textarea textarea');
console.log(textarea)


textarea.forEach(textarea => {
    textarea.addEventListener('keyup', e => {
            textarea.style.height = "30px";
            let scrHeight = e.target.scrollHeight;
            textarea.style.height = `${scrHeight}px`;
    
            if (textarea.offsetHeight >= 200 ) {
                textarea.style.overflowY = 'scroll';
            }
            // console.log(scrHeight)
        });
    })


