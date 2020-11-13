let button = document.querySelector("#test-btn")

function addForm(){
  let testBlock = document.querySelector(".test-block")
  let formBlock = document.querySelector('.form-block')
  formBlock.classList.add("d-block")
  testBlock.classList.add("d-none")
  renderQuiz();
}
button.addEventListener("click", addForm)

async function handleSubmit(e) {
  setTimeout(() => {
    e.preventDefault()
    document.querySelector('.form-submit').classList.add("d-none")
    document.querySelector('.quiz-form').classList.add("d-block")
  }, 2000)
}

// ---------------Qiuz------------------

const quizContainer = document.getElementById('quiz');
const btnPrev = document.getElementById('previous');
const btnNext = document.getElementById('next');
const btnSubmit = document.getElementById('submit');

const PREVIEW = 'PREVIEW';
const RESULT = 'RESULT';

btnSubmit.addEventListener('click', function(e){
  currentQuestion = RESULT;
  renderQuiz();
})

btnNext.addEventListener('click',function(e){
  if(btnNext.classList.contains("btn-disabled")){
    return;
  }
  if(currentQuestion===RESULT){
    currentForm+=1;
    currentQuestion=PREVIEW;
  }else if(currentQuestion===PREVIEW){
    currentQuestion=0;
  }else if(currentQuestion>=QUIZ_DATA.forms[currentForm].questions.length-1){
    currentQuestion = RESULT
  }else{
    currentQuestion+=1;
  }
  renderQuiz();
})
btnPrev.addEventListener('click',function(e){
  if(currentQuestion<=0){
    currentQuestion=PREVIEW;
  }else if(currentQuestion===PREVIEW && currentForm>0){
    currentQuestion=RESULT;
    currentForm-=1;
  }else if(currentQuestion===RESULT){
    currentQuestion=QUIZ_DATA.forms[currentForm].questions.length-1;
  }else{
    currentQuestion-=1;
  }
  renderQuiz();
})

let currentForm = 0;
let currentQuestion = PREVIEW;

function handleCheckbox({form:f, question:q, index:i, mode:m}){
  QUIZ_DATA.forms[f].questions[q].chlidren[i].answer=m;
  renderQuiz();
}

function renderQuiz(){
  const form = QUIZ_DATA.forms[currentForm];
  btnPrev.hidden = currentQuestion==PREVIEW && currentForm==0;
  btnNext.hidden = currentForm >= QUIZ_DATA.forms.length-1 && currentQuestion === RESULT;
  // btnSubmit.hidden = !(currentForm >= QUIZ_DATA.forms.length && currentQuestion >= form.questions.length)
  btnSubmit.hidden = currentForm===RESULT;
  if(currentQuestion!==PREVIEW && currentQuestion!==RESULT && !form.questions[currentQuestion].chlidren.reduce( (a,b)=>(a && b.answer!==null),true)){
    btnNext.classList.add("btn-disabled");
  }else{
    btnNext.classList.remove("btn-disabled");
  }
  if(currentQuestion===PREVIEW){
    btnNext.hidden=false;
  }
  if(currentForm>=QUIZ_DATA.forms.length){
    btnNext.hidden=true;
  }
  quizContainer.innerHTML = `
    <h2>${form.title}<h2>
    ${currentQuestion===RESULT ? (`
      <p class="user-answ">Сумма всех ДА: ${form.questions.map(a=>a.chlidren).flat().reduce((a,b)=>a+(b.answer===1?1:0),0)}</p>
      <p class="user-answ">Сумма всех НЕТ: ${form.questions.map(a=>a.chlidren).flat().reduce((a,b)=>a+(b.answer===0?1:0),0)}</p>
      <p class="user-message">${form.resultDescription}</p>
    `): currentQuestion===PREVIEW ? (`
      ${form.subTitle ? `<p class="test-subtitle">${form.subTitle}</p>` : ``}
    `):(`
    ${form.questions[currentQuestion].title ? `<p class="test-title">${form.questions[currentQuestion].title}</p>`: ``}
      ${form.questions[currentQuestion].chlidren.map((i, index)=>(`
        <p class="test-title">${i.title}</p>
        <form class="test-form">
          <input 
            type="checkbox" 
            onclick='handleCheckbox(${JSON.stringify({
              form: currentForm, 
              question:currentQuestion,
              index: index,
              mode: 1
            })})' 
            id="test-${currentForm}-${currentQuestion}-${index}-1" 
            class="test-input" 
            ${i.answer===1 ? `checked`:``}
          />
          <label class="test-answer" for="test-${currentForm}-${currentQuestion}-${index}-1">
              Да
          </label>
        </form>
        <form class="test-form">
          <input 
            type="checkbox" 
            onclick='handleCheckbox(${JSON.stringify({
              form: currentForm, 
              question:currentQuestion,
              index: index,
              mode: 0
            })})' 
            id="test-${currentForm}-${currentQuestion}-${index}-0" 
            class="test-input" 
            ${i.answer===0 ? `checked`:``}
          />
          <label class="test-answer" for="test-${currentForm}-${currentQuestion}-${index}-0">
              Нет
          </label>
        </form>
      `)).join("")}
      ${form.questions[currentQuestion].subTitle ? `<p class="test-title">${form.questions[currentQuestion].subTitle}</p>`: ``}
    `)}
  `