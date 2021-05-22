const start_btn = document.querySelector('.start');
const rules_box = document.querySelector('.quiz-rules-block');
const exit_btn = rules_box.querySelector('.exit');
const continue_btn = rules_box.querySelector('.continue');
const quiz_box = document.querySelector('.quiz-box');
const time_sec = quiz_box.querySelector('.quiz-timer-sec');
const no_ques = quiz_box.querySelector('.quiz-ques-attend');
const time_line = quiz_box.querySelector('header .time-line');
const result_box = document.querySelector('.result-box');
const time_off = quiz_box.querySelector('.quiz-timer-text');
const close_btn = quiz_box.querySelector('.close-btn');

// onclick start btn
start_btn.addEventListener('click', function(){
    rules_box.classList.add('show-info');
});

// onclick exit btn
exit_btn.addEventListener('click', function(){
    rules_box.classList.remove('show-info');
});

// onclick continue btn
let quescount = 0;
let counter;
let counterLine;
let time_value = 15;
let width_value = 0;
let user_score = 0;
 
continue_btn.addEventListener('click', function(){
    rules_box.classList.remove('show-info');
    quiz_box.classList.add('show-ques-block');
    next(quescount);
    no_question_attended(quescount);
    countSec(15);
    countSecLine(0);
});

function next(index){
    const questions = quiz_box.querySelector('.quiz-box-ques')
    const options = quiz_box.querySelectorAll('.quiz-box-option');
    let question_tag = `<h2>${ques[index].id}. ${ques[index].ques}</h2>`;
    for(var x = 0; x<options.length; x++){
        let options_tag = `<span class="option">${ques[index].opt[x]}</span>`;
        const option_clicked = quiz_box.querySelector('.option')
        options[x].innerHTML = options_tag;
        options[x].setAttribute("onclick","optionSelectd(this,"+index+","+x+")");
        for(var k =0; k<op.length; k++){
            op[k].classList.remove('correct');
            op[k].classList.remove('wrong');
            op[k].classList.remove('disabled');
        }
    }
    questions.innerHTML = question_tag;
}

const correct_count = 0;

// Answer
const op = quiz_box.querySelectorAll('.quiz-box-option');

const next_btn = quiz_box.querySelector('.next-btn-inner');

// Icons
const tick_icon = quiz_box.querySelector('.tick');
const cross_icon = quiz_box.querySelector('.cross');

function optionSelectd(ans, i, x){
    clearInterval(counter);
    clearInterval(counterLine);
    let user_value = ans.textContent;
    let correct_value = ques[quescount].answer;
    if(correct_value == user_value){
       user_score++;
       console.log(user_score);
       op[x].classList.add('correct');
       op[x].insertAdjacentElement('beforeend', tick_icon);
    } else {
        op[x].classList.add('wrong');
        op[x].insertAdjacentElement('beforeend', cross_icon);

        op.forEach(function(item){
            const demo = item.querySelector('.option');
            if(demo.textContent == correct_value){
                item.classList.add('correct');
                console.log('correct ans is ', demo.textContent);
                item.insertAdjacentElement('beforeend', tick_icon);
                
            }
        });
    }
    
    for(var j=0; j<op.length; j++){
        op[j].classList.add('disabled');
    }

    next_btn.style.display = "block";
}

// onclick close btn
close_btn.addEventListener('click', function(){
    quiz_box.classList.remove('show-ques-block');
    quescount = 0;
    time_value = 15;
    width_value = 0;
    user_score = 0;
    quescount = 0;
});

  
// Question Next button

next_btn.addEventListener('click', function(){
    quescount++;
    if(quescount < ques.length){
        next(quescount);
        clearInterval(counter);
        countSec(time_value);
        clearInterval(counterLine);
        countSecLine(width_value);
        next_btn.style.display = "none";
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        result_block();
    }
    no_question_attended(quescount);
});

// No of Question
function no_question_attended(quescount){
    let no_ques_tag = `<span><p>${quescount+1}</p>of<p>${ques.length}</p>Questions</span>`;
    no_ques.innerHTML = no_ques_tag;
}

// Result Box
const  restart_btn = result_box.querySelector('.restart');
const result_quit = result_box.querySelector('.quit');
const result_content = result_box.querySelector('.some-content');

function result_block(){
    quiz_box.classList.remove('show-ques-block');
    result_box.classList.add('show-result-block');
    if(user_score > 3){
        let result_content_tag = `<h1>You've Completed the Quiz!.</h1>
                              <h2>and Congrats!!, You got Only <p>${user_score}</p>out of<p>${ques.length}</p>.</h2>`;
            result_content.innerHTML = result_content_tag;
    }
    else if(user_score > 2){
        let result_content_tag = `<h1>You've Completed the Quiz!.</h1>
                              <h2>and Nice!, You got Only <p>${user_score}</p>out of<p>${ques.length}</p>.</h2>`;
            result_content.innerHTML = result_content_tag;
    }
    else{
        let result_content_tag = `<h1>You've Completed the Quiz!.</h1>
                              <h2>and Sorry, You got Only <p>${user_score}</p>out of<p>${ques.length}</p>.</h2>`;
            result_content.innerHTML = result_content_tag;
    }    
    user_score = 0;

    
}

restart_btn.addEventListener('click', function(){
    result_box.classList.remove('show-result-block');
    quiz_box.classList.add('show-ques-block');
    quescount = 0;
    time_value = 15;
    width_value = 0;
    user_score = 0;
    quescount = 0;
    next(quescount);
    clearInterval(counter);
    countSec(time_value);
    clearInterval(counterLine);
    countSecLine(width_value);
    next_btn.style.display = "none";
    no_question_attended(quescount);
});

result_quit.addEventListener('click', function(){
    result_box.classList.remove('show-result-block');
    quescount = 0;
});

// Sec Counter
function countSec(t){
    counter = setInterval(timer, 1000);
    function timer(){
        time_sec.textContent = t;
        t--;
        if(t < 9){
            let addZero = time_sec.textContent;
            time_sec.textContent = '0'+addZero;
        }
        if(t < 0){
            clearInterval(counter);
            time_sec.textContent = '00';
            time_off.textContent = "Time Off"

             let correct_value = ques[quescount].answer;
             op.forEach(function(item){
                const demo = item.querySelector('.option');
                if(demo.textContent == correct_value){
                    item.classList.add('correct');
                    console.log('correct ans is ', demo.textContent);
                    item.insertAdjacentElement('beforeend', tick_icon);
                    
                }
            });

            for(var j=0; j<op.length; j++){
                op[j].classList.add('disabled');
            }
        
            next_btn.style.display = "block";
        }
    }
}

// Timeline
function countSecLine(t){
    counterLine = setInterval(timer, 27);
    function timer(){
        t += 1;
        time_line.style.width = t+"px"; 
        if(t > 599){
            clearInterval(counterLine);
        }
    }
}