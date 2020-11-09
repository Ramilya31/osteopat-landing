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
  btnNext.hidden = currentForm >= QUIZ_DATA.forms.length && currentQuestion >= form.questions.length;
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
}

if(document.querySelector("#kgz")){
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
    }else if(currentQuestion>=QUIZ_DATA2.forms[currentForm].questions.length-1){
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
      currentQuestion=QUIZ_DATA2.forms[currentForm].questions.length-1;
    }else{
      currentQuestion-=1;
    }
    renderQuiz();
  })

  let currentForm = 0;
  let currentQuestion = PREVIEW;

  function handleCheckbox({form:f, question:q, index:i, mode:m}){
    QUIZ_DATA2.forms[f].questions[q].chlidren[i].answer=m;
    renderQuiz();
  }

  function renderQuiz(){
    const form = QUIZ_DATA2.forms[currentForm];
    btnPrev.hidden = currentQuestion==PREVIEW && currentForm==0;
    btnNext.hidden = currentForm >= QUIZ_DATA2.forms.length && currentQuestion >= form.questions.length;
    // btnSubmit.hidden = !(currentForm >= QUIZ_DATA2.forms.length && currentQuestion >= form.questions.length)
    btnSubmit.hidden = currentForm===RESULT;
    // if(currentQuestion!==PREVIEW && currentQuestion!==RESULT && !form.questions[currentQuestion].chlidren.reduce( (a,b)=>(a && b.answer!==null),true)){
    //   btnNext.classList.add("btn-disabled");
    // }else{
    //   btnNext.classList.remove("btn-disabled");
    // }
    if(currentQuestion===PREVIEW){
      btnNext.hidden=false;
    }
    if(currentForm>=QUIZ_DATA2.forms.length){
      btnNext.hidden=true;
    }
    quizContainer.innerHTML = `
      <h2>${form.title}<h2>
      ${currentQuestion===RESULT ? (`
        <p class="user-answ">Ооба (бардыгы): ${form.questions.map(a=>a.chlidren).flat().reduce((a,b)=>a+(b.answer===1?1:0),0)}</p>
        <p class="user-answ">Жок (бардыгы): ${form.questions.map(a=>a.chlidren).flat().reduce((a,b)=>a+(b.answer===0?1:0),0)}</p>
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
                Ооба
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
                Жок
            </label>
          </form>
        `)).join("")}
        ${form.questions[currentQuestion].subTitle ? `<p class="test-title">${form.questions[currentQuestion].subTitle}</p>`: ``}
      `)}
    `
  }
}


// (function(){
//   // Functions
//   function buildQuiz(){
//     // variable to store the HTML output
//     const output = [];

//     // for each question...
//     myQuestions.forEach(
//       (currentQuestion, questionNumber) => {

//         // variable to store the list of possible answers
//         const answers = [];
//         const subAnswers = [];
//         const subAnswers2 = [];
//         const subAnswers3 = [];
//         const subAnswers4 = [];

//         // and for each available answer...
//         for(letter in currentQuestion.answers){
//           // ...add an HTML radio button
//           answers.push(
//             `
//             <div id="wrapped">
//               <input type="radio" id="test-${letter}" class="test-input" name="question${questionNumber}" value="${letter}"/>
//               <label for="test-${letter}">
//                     ${currentQuestion.answers[letter]}
//               </label>
//             </div>
//             `
//           );
//         }

//         for(key in currentQuestion?.subQuestions?.subAnswer1){
//           subAnswers.push(
//             `
//               <form>
//               <input type="checkbox" id="test-${key}" class="test-input" name="question${questionNumber}" value="${key}"/>
//               <label for="test-${key}">
//                     ${currentQuestion?.subQuestions.subAnswer1[key]}
//                 </label>
//               </form>
//           `)
//         }

//         for(answers2 in currentQuestion?.subQuestions?.subAnswers2){
//           subAnswers2.push(
//             `
//             <form id="wrapped">
//               <input type="checkbox" id="test-${answers2}" class="test-input" name="question${questionNumber}" value="${answers2}"/>
//               <label for="test-${answers2}">
//                   ${currentQuestion?.subQuestions.subAnswers2[answers2]}
//               </label>
//             </form>
//           `)
//         }
//         for(answers3 in currentQuestion?.subQuestions?.subAnswers3){
//           subAnswers3.push(
//             `
//             <form id="wrapped">
//               <input type="checkbox" id="test-${answers3}" class="test-input" name="question${questionNumber}" value="${answers3}"/>
//               <label for="test-${answers3}">
//                   ${currentQuestion?.subQuestions.subAnswers3[answers3]}
//               </label>
//             </form>
//           `
//           )
//         }

//         for(answers4 in currentQuestion?.subQuestions?.subAnswers4){
//           subAnswers4.push(
//           `
//           <form id="wrapped">
//             <input type="checkbox" id="test-${answers4}" class="test-input" name="question${questionNumber}" value="${answers4}"/>
//             <label for="test-${answers4}">
//                 ${currentQuestion?.subQuestions?.subAnswers4[answers4]}
//             </label>
//           </form>
//         `)
//         }
//         console.log()

//         // add this question and its answers to the output
//         output.push(
//           `<div class="slide">
//             <pre class="quiz-heading pb-3">${currentQuestion.heading}</pre>
//             <pre class="quiz-sub-heading pb-2">${currentQuestion.subHeading}</pre>
//             <pre class="question"> ${currentQuestion.question}</pre>
//             <div class="answers"> ${answers.join("")} </div>
//             <div class="quiz-message">${currentQuestion.message}</div>
//             <div class="subQuestion">${currentQuestion?.subQuestions?.subQuestion1 ? currentQuestion?.subQuestions?.subQuestion1 : ""}</div>
//             <div class="subAnswers pb-3">${subAnswers.join("")}</div>
//             <div class="subQuestion">${currentQuestion?.subQuestions?.subQuestion2 ? currentQuestion?.subQuestions?.subQuestion2 : ""}</div>
//             <div class="subAnswers pb-3">${subAnswers2.join("")}</div>
//             <div class="subQuestion">${currentQuestion?.subQuestions?.subQuestion3 ? currentQuestion?.subQuestions?.subQuestion3 : ""}</div>
//             <div class="subAnswers pb-3">${subAnswers3.join("")}</div>
//             <div class="subQuestion">${currentQuestion?.subQuestions?.subQuestion4 ? currentQuestion?.subQuestions?.subQuestion4 : ""}</div>
//             <div class="subAnswers">${subAnswers4.join("")}</div>
//           </div>`
//         );
//       }
//     );

//     // finally combine our output list into one string of HTML and put it on the page
//     quizContainer.innerHTML = output.join('');
//   }

//   function showResults(){

//     // gather answer containers from our quiz
//     const answerContainers = quizContainer.querySelectorAll('.answers');

//     // keep track of user's answers
//     let numCorrect = -1;
//     let wAnswers = -1

//     // for each question...
//     myQuestions.forEach( (currentQuestion, questionNumber) => {

//       // find selected answer
//       const answerContainer = answerContainers[questionNumber];
//       const selector = `input[name=question${questionNumber}]:checked`;
//       const userAnswer = (answerContainer.querySelector(selector) || {}).value;

//       // if answer is correct
//       if(userAnswer === currentQuestion.correctAnswer){
//         // add to the number of correct answers
//         numCorrect++;

//       } else if(userAnswer === currentQuestion.wrongAnswers){
//         wAnswers++
//       }
//       else{
//         // color the answers red
//         // answerContainers[questionNumber].style.color = 'red';
//       }
//     });

//     const resultsInfo = document.querySelector(".quiz-form");

//     // show number of correct answers out of total
//     numCorrect + wAnswers >= 1 && numCorrect + wAnswers <= 8 ? resultsInfo.innerHTML = `<div>
//     <p>Сумма всех ДА: ${numCorrect}</p>
//     <p>Сумма всех НЕТ: ${wAnswers}</p>
//     Если вы ответили ДА хотя бы на один из поставленных по родам вопросов, вполне очевидно, что череп вашего малыша подвергся некоторому напряжению.
//     По типу предлежания, обеспечивающему лёгкое или трудное изгнание плода, самостоятельные роды или родовспоможение, череп новорождённого испытает более или менее сильные нагрузки.
//     Хочется ещё раз повторить, что каждые роды особые и единственные в своём роде. Нельзя частный случай возводить в ранг общего и универсального закона!
//     Визит к остеопату необходим сразу же после родов, как только появляется для него возможность.</div>` : resultsInfo.innerHTML = `<div><p>Сумма всех ДА: ${numCorrect}</p>
//     <p>Сумма всех НЕТ: ${wAnswers}</p>
//     Чем больше ответов ДА, тем больше необходимость посетить остеопата.</div>`;
//   }

//   function showSlide(n) {
//     slides[currentSlide].classList.remove('active-slide');
//     slides[n].classList.add('active-slide');
//     currentSlide = n;
//     if(currentSlide === 0){
//       previousButton.style.display = 'none';
//     }
//     else{
//       previousButton.style.display = 'inline-block';
//     }
//     // if(currentSlide > firstBlockQues){
//     //   submitButton.style.display = "inline-block"
//     // }
//     if(currentSlide === slides.length-1){
//       nextButton.style.display = 'none';
//       // submitButton.style.display = 'inline-block';
//     }
//     else{
//       nextButton.style.display = 'inline-block';
//       submitButton.style.display = 'inline-block';
//     }
//   }

//   function showNextSlide() {    
//     showSlide(currentSlide + 1);
//   }

//   function showPreviousSlide() {
//     showSlide(currentSlide - 1);
//   }

//   // Variables
//   const quizContainer = document.getElementById('quiz');
//   const submitButton = document.getElementById('submit');
//   const myQuestions = [
//     {
//       heading: "АНКЕТА 1.",
//       subHeading: "Роды.",
//       question: "1. Ваши роды были трудными, долгосрочными, краткосрочными или преждевременными.",
//       answers: {
//         a: "Да",
//         b: "Нет",
//       },
//       message: "",
//       correctAnswer: "a",
//       wrongAnswers: "b"
//     },
//     {
//       heading: "АНКЕТА 1.",
//       subHeading: "Роды.",
//       question: "2. Ваши роды были спровоцированы, ускорены или замедлены.",
//       answers: {
//         c: "Да",
//         d: "Нет",
//       },
//       message: "",
//       correctAnswer: "c",
//       wrongAnswers: "d"
//     },
//     {
//       heading: "АНКЕТА 1.",
//       subHeading: "Роды.",
//       question: "3. Вам пришлось дожидаться акушера? Вас просили искусственно задержать роды: «сжать бёдра», сдерживать процесс родов, идти самой в родильное отделение в тот момент, когда ребёнок лежал уже очень низко.",
//       answers: {
//         e: "Да",
//         f: "Нет",
//       },
//       message: "",
//       correctAnswer: "e",
//       wrongAnswers: "f"
//     },
//     {
//       heading: "АНКЕТА 1.",
//       subHeading: "Роды.",
//       question: "4. Каково было предлежание? Лицом?",
//       answers: {
//         g: "Да",
//         h: "Нет",
//       },
//       message: "",
//       correctAnswer: "g",
//       wrongAnswers: "h"
//     },{
//       heading: "АНКЕТА 1.",
//       subHeading: "Роды.",
//       question: "5. Каково было предлежание? Ягодицами?",
//       answers: {
//         i: "Да",
//         j: "Нет",
//       },
//       message: "",
//       correctAnswer: "i",
//       wrongAnswers: "j"
//     },
//     {
//       heading: "АНКЕТА 1.",
//       subHeading: "Роды.",
//       question: "6. Использовались ли щипцы, шпатель или вантуз при родах?",
//       answers: {
//         k: "Да",
//         l: "Нет",
//       },
//       message: "",
//       correctAnswer: "k",
//       wrongAnswers: "l"
//     },
//     {
//       heading: "АНКЕТА 1.",
//       subHeading: "Роды.",
//       question: "7. Было ли у вас кесарево сечение? Плановое или в срочном порядке?",
//       answers: {
//         m: "Да",
//         n: "Нет",
//       },
//       message: "",
//       correctAnswer: "m",
//       wrongAnswers: "n"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка. \n (Грудной ребёнок - это ребёнок в возрасте от 10 дней до 24 месяцев, некоторые врачи считают, что до 30 месяцев).",
//       question: "1. Ваш малыш выказывает признаки недовольства, он плачет, когда его берут на руки, пеленают, меняют подгузники или выполняют другие необходимые ему манипуляции.",
//       answers: {
//         o: "Да",
//         p: "Нет",
//       },
//       message: "",
//       correctAnswer: "o",
//       wrongAnswers: "p"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "2. Он судорожно вздрагивает, выгибается или напрягается без видимой причины.",
//       answers: {
//         q: "Да",
//         r: "Нет",
//       },
//       message: "",
//       correctAnswer: "q",
//       wrongAnswers: "r"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "3. Лёжа или сидя у вас на руках он запрокидывает назад голову без явной на то причины.",
//       answers: {
//         s: "Да",
//         t: "Нет",
//       },
//       message: "",
//       correctAnswer: "s",
//       wrongAnswers: "t"

//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "4. Лёжа в кроватке, он пытается всё время искать опору для головы, опираясь, например, о прутья кроватки.",
//       answers: {
//         u: "Да",
//         v: "Нет",
//       },
//       message: "",
//       correctAnswer: "u",
//       wrongAnswers: "v"

//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: `5. Лёжа. 
//       Он спит на одном и том же боку.`,
//       subQuestions: {
//         subQuestion1: "Он спит на одном и том же боку.",
//         subAnswer1: {
//           w12: "Да",
//           x12: "Нет"
//         },
//         subQuestion2: "Он поворачивает голову в одну и ту же сторону.",
//         subAnswers2: {
//         y: "Да",
//         z: "Нет",
//       },
//       subQuestion3: "Его голова находится в положении постоянного гиперразгибания, она сильно запрокинута назад (в этом случае образуется свободное пространство между его шеей и кроваткой).",
//       subAnswers3: {
//         a1: "Да",
//         b1: "Нет",
//       },
//       },
//       answers: {
//         w: "Да",
//         x: "Нет",
//       },
//       message: "",
//       correctAnswer: "w",
//       wrongAnswers: "x"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "6. Лёжа, когда голова ребёнка лежит на одной оси с телом, посмотрите, как ведут себя верхние и нижние конечности. Они занимают асимметричное положение.",
//       answers: {
//         c1: "Да",
//         d1: "Нет",
//       },
//       message: "",
//       correctAnswer: "c1",
//       wrongAnswers: "d1"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "7. Он выгибается , как лук, когда лежит на спине.",
//       answers: {
//         e1: "Да",
//         f1: "Нет",
//       },
//       message: "",
//       correctAnswer: "e1",
//       wrongAnswers: "f1"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "8. Он не спит лёжа на спине, а избегает такого положения, считая его неприятным или неудобным.",
//       answers: {
//         g1: "Да",
//         h1: "Нет",
//       },
//       message: "",
//       correctAnswer: "g1",
//       wrongAnswers: "h1"
//     },
//     // {
//     //   heading: "АНКЕТА 2.",
//     //   subHeading: "Для грудного ребёнка.",
//     //   question: "9. Когда вы моете вашего малыша, он кричит, если вы дотрагиваетесь до его: \n Головы.",
//     //   answers: {
//     //     i1: "Да",
//     //     j1: "Нет",
//     //   },
//     //   message: "",
//     //   correctAnswer: "i1",
//     //   wrongAnswers: "j1"
//     // },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: `9. Когда вы моете вашего малыша, он кричит, если вы дотрагиваетесь до его: 
//       Головы.`,
//       subQuestions: {
//         subQuestion4: "Затылка",
//         subAnswers4: {
//           w23: "Да",
//           x23: "Нет"
//         },
//         subQuestion5: "Других частей тела.",
//         subAnswers5: {
//         y23: "Да",
//         z23: "Нет",
//         },
//       },
//       answers: {
//         w: "Да",
//         x: "Нет",
//       },
//       message: "",
//       correctAnswer: "w",
//       wrongAnswers: "x"
//     },
//     // {
//     //   heading: "АНКЕТА 2.",
//     //   subHeading: "Для грудного ребёнка.",
//     //   question: "Затылка.",
//     //   answers: {
//     //     k1: "Да",
//     //     l1: "Нет",
//     //   },
//     //   message: "",
//     //   correctAnswer: "k1",
//     //   wrongAnswers: "l1"
//     // },
//     // {
//     //   heading: "АНКЕТА 2.",
//     //   subHeading: "Для грудного ребёнка.",
//     //   question: "Других частей тела.",
//     //   answers: {
//     //     m1: "Да",
//     //     n1: "Нет",
//     //   },
//     //   message: "",
//     //   correctAnswer: "m1",
//     //   wrongAnswers: "n1"
//     // },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "10. Он плачет систематически, если вы касаетесь верхней части его затылка.",
//       answers: {
//         o1: "Да",
//         p1: "Нет",
//       },
//       message: "",
//       correctAnswer: "o1",
//       wrongAnswers: "p1"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "11. Он издаёт пронзительные крики, хнычет без всякой очевидной причины.",
//       answers: {
//         q1: "Да",
//         r1: "Нет",
//       },
//       message: "",
//       correctAnswer: "q1",
//       wrongAnswers: "r1"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Малыш постоянно или часто плачет без видимой причины.",
//       answers: {
//         s1: "Да",
//         t1: "Нет",
//       },
//       message: "",
//       correctAnswer: "s1",
//       wrongAnswers: "t1"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "12. У малыша обильное слюноотделение, он любит пускать слюни.",
//       answers: {
//         u1: "Да",
//         v1: "Нет",
//       },
//       message: "",
//       correctAnswer: "u1",
//       wrongAnswers: "v1"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "13. Ваш младенец хорошо сосёт грудь.",
//       answers: {
//         w1: "Да",
//         x1: "Нет",
//       },
//       message: "",
//       correctAnswer: "w1",
//       wrongAnswers: "x1"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Его нужно заставлять брать грудь или рожок.",
//       answers: {
//         y1: "Да",
//         z1: "Нет",
//       },
//       message: "",
//       correctAnswer: "y1",
//       wrongAnswers: "z1"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: `14. После кормления грудью или после рожка ваш ребёнок:
//       Систематически срыгивает.`,
//       answers: {
//         a2: "Да",
//         b2: "Нет",
//       },
//       message: "",
//       correctAnswer: "a2",
//       wrongAnswers: "b2"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "-Имеет частую или систематическую рвоту.",
//       answers: {
//         c2: "Да",
//         d2: "Нет",
//       },
//       message: "",
//       correctAnswer: "c2",
//       wrongAnswers: "d2"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "-У него часто бывает отрыжка.",
//       answers: {
//         e2: "Да",
//         f2: "Нет",
//       },
//       message: "",
//       correctAnswer: "e2",
//       wrongAnswers: "f2"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "-Он часто икает",
//       answers: {
//         g2: "Да",
//         h2: "Нет",
//       },
//       message: "Срыгивание - это более или менее быстрый выброс пищи, единовременный или повторяющийся, всего несколько кубических сантиметров жидкости или молока. Он в норме не должен превышать объём, равный трём кофейным ложкам жидкости. Нужно отличать срыгивание от рвоты.",
//       correctAnswer: "g2",
//       wrongAnswers: "h2"
//     },
//     // {
//     //   heading: "АНКЕТА 2.",
//     //   subHeading: "Для грудного ребёнка.",
//     //   question: "Срыгивание - это более или менее быстрый выброс пищи, единовременный или повторяющийся, всего несколько кубических сантиметров жидкости или молока. Он в норме не должен превышать объём, равный трём кофейным ложкам жидкости. Нужно отличать срыгивание от рвоты.",
//       // answers: {
//       //   i2: "Да",
//       //   j2: "Нет",
//       // // },
//       // message: "",
//       // correctAnswer: "i2",
//       // wrongAnswers: "j2"
//     // },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "15. Ваш малыш испытывает трудности при глотании.",
//       answers: {
//         k2: "Да",
//         l2: "Нет",
//       },
//       message: "",
//       correctAnswer: "k2",
//       wrongAnswers: "l2"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Он с трудом сосёт.",
//       answers: {
//         m2: "Да",
//         n2: "Нет",
//       },
//       message: "",
//       correctAnswer: "m2",
//       wrongAnswers: "n2"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "16. Когда вы держите малыша на руках, вы слышите, как трудно ему дышать.",
//       answers: {
//         o2: "Да",
//         p2: "Нет",
//       },
//       message: "",
//       correctAnswer: "o2",
//       wrongAnswers: "p2"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "17. Вы смотрите на ребёнка, наблюдая за всеми его движениями: \n Он достаточно подвижен и активен для своего возраста.",
//       answers: {
//         q2: "Да",
//         r2: "Нет",
//       },
//       message: "",
//       correctAnswer: "q2",
//       wrongAnswers: "r2"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Он недостаточно бодрый, крепкий и живой.",
//       answers: {
//         s2: "Да",
//         t2: "Нет",
//       },
//       message: "",
//       correctAnswer: "s2",
//       wrongAnswers: "t2"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Он кажется вам беспокойным и сверхвозбудимым.",
//       answers: {
//         u2: "Да",
//         v2: "Нет",
//       },
//       message: "",
//       correctAnswer: "u2",
//       wrongAnswers: "v2"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "18. Днём ваш малыш слишком часто засыпает и долго спит, несмотря на то, что он хорошо спит ночью.",
//       answers: {
//         w2: "Да",
//         x2: "Нет",
//       },
//       message: "",
//       correctAnswer: "w2",
//       wrongAnswers: "x2"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Он путает день с ночью. Днём спит, а ночью бодрствует.",
//       answers: {
//         y2: "Да",
//         z2: "Нет",
//       },
//       message: "",
//       correctAnswer: "y2",
//       wrongAnswers: "z2"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Его нужно всё время укачивать и уговаривать, чтобы он заснул.",
//       answers: {
//         a3: "Да",
//         b3: "Нет",
//       },
//       message: "",
//       correctAnswer: "a3",
//       wrongAnswers: "b3"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Он засыпает с трудом.",
//       answers: {
//         c3: "Да",
//         d3: "Нет",
//       },
//       message: "",
//       correctAnswer: "c3",
//       wrongAnswers: "d3"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Он всё время плачет, перед тем как заснуть, и когда просыпается.",
//       answers: {
//         e3: "Да",
//         f3: "Нет",
//       },
//       message: "",
//       correctAnswer: "e3",
//       wrongAnswers: "f3"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Он систематически будит вас ночью своим беспричинным плачем.",
//       answers: {
//         g3: "Да",
//         h3: "Нет",
//       },
//       message: "",
//       correctAnswer: "g3",
//       wrongAnswers: "h3"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Он часто страдает от бессонницы",
//       answers: {
//         i3: "Да",
//         j3: "Нет",
//       },
//       message: "",
//       correctAnswer: "i3",
//       wrongAnswers: "j3"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "19. Вы наблюдаете за вашим ребёнком и обнаруживаете, что при плаче слезы у него текут из обоих глаз.",
//       answers: {
//         k3: "Да",
//         l3: "Нет",
//       },
//       message: "",
//       correctAnswer: "k3",
//       wrongAnswers: "l3"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Слезы текут только из одного глаза.",
//       answers: {
//         m3: "Да",
//         n3: "Нет",
//       },
//       message: "",
//       correctAnswer: "m3",
//       wrongAnswers: "n3"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "У него есть шишка на голове, на волосистой части кожи головы (серозно-кровяная шишка).",
//       answers: {
//         o3: "Да",
//         p3: "Нет",
//       },
//       message: "",
//       correctAnswer: "o3",
//       wrongAnswers: "p3"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "У него несимметричное лицо или голова.",
//       answers: {
//         q3: "Да",
//         r3: "Нет",
//       },
//       message: "",
//       correctAnswer: "q3",
//       wrongAnswers: "r3"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "Его голова более плоская с одной стороны.",
//       answers: {
//         s3: "Да",
//         t3: "Нет",
//       },
//       message: "",
//       correctAnswer: "s3",
//       wrongAnswers: "t3"
//     },
//     {
//       heading: "АНКЕТА 2.",
//       subHeading: "Для грудного ребёнка.",
//       question: "20. Когда вы кладёте вашего ребёнка на стол для пеленания, его позвоночник кажется вам прямым и малоподвижным.",
//       answers: {
//         u3: "Да",
//         v3: "Нет",
//       },
//       message: "",
//       correctAnswer: "u3",
//       wrongAnswers: "v3"
//     },
//     {
//       heading: "Анкета 2.",
//       subHeading: "Для грудного ребёнка.",
//       // id: "long-text",
//       question: "В тот момент, когда ребёнок полностью расслаблен и не плачет, вы кладёте ему руку на животик и обнаруживаете, что живот чрезмерно напряжён.",
//       answers: {
//         w3: "Да",
//         x3: "Нет",
//       },
//       message: "",
//       correctAnswer: "w3"
//     },
//     {
//       heading: `АНКЕТА 3.`,
//       subHeading:"Для ребёнка младшего возраста. (от 24 или 30 месяцев до 5 лет). \n Перед тем как ответить на вопросы этой анкеты, ответьте на вопросы предыдущей анкеты, даже если ваш ребёнок вырос. Постарайтесь восстановить по памяти его поведение. \n Даже если ваш ребёнок вышел из грудного возраста, вы сможете найти некоторые сигналы тревоги, оставшиеся ранее не замеченными. На Анкету 2 следует ответить, чтобы лучше понимать вопросы Анкеты 3" ,
//       question: "",
//       // answers: {
//       //   w3: "Да",
//       //   x3: "Нет",
//       // // },
//       message: "",
//       // correctAnswer: "w3",
//       // wrongAnswers: "x3"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "1. Ваш ребёнок уже часто болеет отитом.",
//       answers: {
//         y3: "Да",
//         z3: "Нет",
//       },
//       message: "",
//       correctAnswer: "y3",
//       wrongAnswers: "z3"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Отиты плохо поддаются лечению и имеют рецидивы.",
//       answers: {
//         a4: "Да",
//         b4: "Нет",
//       },
//       message: "",
//       correctAnswer: "a4",
//       wrongAnswers: "b4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "У вашего ребёнка наблюдается ухудшение слуха.",
//       answers: {
//         c4: "Да",
//         d4: "Нет",
//       },
//       message: "",
//       correctAnswer: "c4",
//       wrongAnswers: "d4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Ему прописывают дренаж.",
//       answers: {
//         e4: "Да",
//         f4: "Нет",
//       },
//       message: "",
//       correctAnswer: "e4",
//       wrongAnswers: "f4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "2. Ваш ребёнок круглый год ходит с насморком.",
//       answers: {
//         g4: "Да",
//         h4: "Нет",
//       },
//       message: "",
//       correctAnswer: "g4",
//       wrongAnswers: "h4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Эти насморки рецидивируют, несмотря на разное медицинское лечение.",
//       answers: {
//         i4: "Да",
//         j4: "Нет",
//       },
//       message: "",
//       correctAnswer: "i4",
//       wrongAnswers: "j4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "После удаления полипов он подвержен простудам.",
//       answers: {
//         k4: "Да",
//         l4: "Нет",
//       },
//       message: "",
//       correctAnswer: "k4",
//       wrongAnswers: "l4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Он всё время болеет ринофарингитами, несмотря на различное медицинское лечение.",
//       answers: {
//         m4: "Да",
//         n4: "Нет",
//       },
//       message: "",
//       correctAnswer: "m4",
//       wrongAnswers: "n4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Он всё время дышит ртом.",
//       answers: {
//         o4: "Да",
//         p4: "Нет",
//       },
//       message: "",
//       correctAnswer: "o4",
//       wrongAnswers: "p4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "3. Падал ли Ваш ребенок? Не падал ли он со стола для пеленания.",
//       answers: {
//         q4: "Да",
//         r4: "Нет",
//       },
//       message: "",
//       correctAnswer: "q4",
//       wrongAnswers: "r4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Ваш ребёнок часто падает.",
//       answers: {
//         s4: "Да",
//         t4: "Нет",
//       },
//       message: "",
//       correctAnswer: "s4",
//       wrongAnswers: "t4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Когда он падает, каждый раз ударяется головой.",
//       answers: {
//         u4: "Да",
//         v4: "Нет",
//       },
//       message: "",
//       correctAnswer: "u4",
//       wrongAnswers: "v4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Он резко падал на ягодицы, но без видимых последствий.",
//       answers: {
//         w4: "Да",
//         x4: "Нет",
//       },
//       message: "",
//       correctAnswer: "w4",
//       wrongAnswers: "x4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Он упал ничком и ушиб лицо, его ударили по лицу, он получил удар в подбородок, сзади по голове, но без видимых нарушений и последствий (рентгеновский снимок в норме).",
//       answers: {
//         y4: "Да",
//         z4: "Нет",
//       },
//       message: "",
//       correctAnswer: "y4",
//       wrongAnswers: "z4"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Он падал навзничь.",
//       answers: {
//         a5: "Да",
//         b5: "Нет",
//       },
//       message: "",
//       correctAnswer: "a5",
//       wrongAnswers: "b5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "От удара у него вдруг перехватило дыхание.",
//       answers: {
//         c5: "Да",
//         d5: "Нет",
//       },
//       message: "",
//       correctAnswer: "c5",
//       wrongAnswers: "d5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Он был в машине во время столкновения, и хотя машина получила сильный удар, он не пострадал и не имел видимых последствий.",
//       answers: {
//         e5: "Да",
//         f5: "Нет",
//       },
//       message: "",
//       correctAnswer: "e5",
//       wrongAnswers: "f5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Он уже имеет истинный сколиоз, хотя едва умеет ходить. Это подтверждается ренгенограммой.",
//       answers: {
//         g5: "Да",
//         h5: "Нет",
//       },
//       message: "",
//       correctAnswer: "g5",
//       wrongAnswers: "h5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Он косит одним глазом",
//       answers: {
//         i5: "Да",
//         j5: "Нет",
//       },
//       message: "",
//       correctAnswer: "i5",
//       wrongAnswers: "j5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Он косит на оба глаза.",
//       answers: {
//         k5: "Да",
//         l5: "Нет",
//       },
//       message: "",
//       correctAnswer: "k5",
//       wrongAnswers: "l5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Его глаза расположены асимметрично.",
//       answers: {
//         m5: "Да",
//         n5: "Нет",
//       },
//       message: "",
//       correctAnswer: "m5",
//       wrongAnswers: "n5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "У него уже есть проблемы со зрением.",
//       answers: {
//         o5: "Да",
//         p5: "Нет",
//       },
//       message: "",
//       correctAnswer: "o5",
//       wrongAnswers: "p5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Ему нужно носить очки или линзы.",
//       answers: {
//         q5: "Да",
//         r5: "Нет",
//       },
//       message: "",
//       correctAnswer: "q5",
//       wrongAnswers: "r5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Мой ребёнок близорукий",
//       answers: {
//         s5: "Да",
//         t5: "Нет",
//       },
//       message: "",
//       correctAnswer: "s5",
//       wrongAnswers: "t5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Мой ребёнок дальнозоркий.",
//       answers: {
//         u5: "Да",
//         v5: "Нет",
//       },
//       message: "",
//       correctAnswer: "u5",
//       wrongAnswers: "v5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Мой ребёнок страдает астигматизмом.",
//       answers: {
//         w5: "Да",
//         x5: "Нет",
//       },
//       message: "",
//       correctAnswer: "w5",
//       wrongAnswers: "x5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
//       answers: {
//         y5: "Да",
//         z5: "Нет",
//       },
//       message: "",
//       correctAnswer: "y5",
//       wrongAnswers: "z5"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
//       answers: {
//         a6: "Да",
//         b6: "Нет",
//       },
//       message: "",
//       correctAnswer: "a6",
//       wrongAnswers: "b6"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "9. У него постоянно открыт рот, а зубы сомкнуты.",
//       answers: {
//         c6: "Да",
//         d6: "Нет",
//       },
//       message: "",
//       correctAnswer: "c6",
//       wrongAnswers: "d6"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "У него плохой зубной прикус и плохой зубной контакт.",
//       answers: {
//         e6: "Да",
//         f6: "Нет",
//       },
//       message: "В норме все зубы размещаются равномерно, а зубы верхней челюсти слегка заходят на зубы нижней челюсти.",
//       correctAnswer: "e6",
//       wrongAnswers: "f6"
//     },
//     // {
//       // heading: "АНКЕТА 3.",
//       // subHeading: `Для ребёнка младшего возраста. 
//       // (от 24 или 30 месяцев до 5 лет).`,
//       // question: "В норме между передними резцами не должно быть пустого пространства. Ваш ребёнок постоянно сосёт один или два пальца, свою пустышку или ещё что-нибудь.",
//       // answers: {
//       //   g6: "Да",
//       //   h6: "Нет",
//       // // },
//       // message: "",
//       // correctAnswer: "g6",
//       // wrongAnswers: "h6"
//     // },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Есть щербины или пустое пространство между передними зубами.",
//       answers: {
//         i6: "Да",
//         j6: "Нет",
//       },
//       message: "В норме между передними резцами не должно быть пустого пространства. Ваш ребёнок постоянно сосёт один или два пальца, свою пустышку или ещё что-нибудь.",
//       correctAnswer: "i6",
//       wrongAnswers: "j6"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Его язык легко проходит в щель между передними зубами.",
//       answers: {
//         k6: "Да",
//         l6: "Нет",
//       },
//       message: "",
//       correctAnswer: "k6",
//       wrongAnswers: "l6"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Попросите малыша открыть рот и осмотрите ротовую полость. Осмотрите его верхнее нёбо и горло, освещая их карманным фонариком. Он имеет высокое, очень вогнутое нёбо.",
//       answers: {
//         m6: "Да",
//         n6: "Нет",
//       },
//       message: "",
//       correctAnswer: "m6",
//       wrongAnswers: "n6"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "Это происходит, если ребёнок постоянно сосёт палец или пустышку. Нёбо поднимается. На нём «отпечатывается» след пальца или пустышки. Нёбо деформируется, деформируются зубы и передняя часть верхней челюсти. Мама своим пальцем может оценить глубину нёба своего малыша. На глаз нёбо ребёнка узкое.",
//       answers: {
//         o6: "Да",
//         p6: "Нет",
//       },
//       message: "",
//       correctAnswer: "o6",
//       wrongAnswers: "p6"
//     },
//     {
//       heading: "АНКЕТА 3.",
//       subHeading: `Для ребёнка младшего возраста. 
//       (от 24 или 30 месяцев до 5 лет).`,
//       question: "На глаз нёбо ребёнка широкое.",
//       answers: {
//         q6: "Да",
//         r6: "Нет",
//       },
//       message: "Чаще всего высокое (глубокое) нёбо бывает узким. Плоское нёбо бывает широким.",
//       correctAnswer: "q6",
//       wrongAnswers: "r6"
//     },
//     // {
//     //   heading: "АНКЕТА 3.",
//     //   subHeading: `Для ребёнка младшего возраста. 
//     //   (от 24 или 30 месяцев до 5 лет).`,
//     //   question: "Чаще всего высокое (глубокое) нёбо бывает узким. Плоское нёбо бывает широким.",
//     //   // answers: {
//     //   //   s6: "Да",
//     //   //   t6: "Нет",
//     //   // // },
//     //   message: "",
//     //   // correctAnswer: "s6",
//     //   // wrongAnswers: "t6"
//     // },
//     {
//       heading: "Анкета 3.",
//       subHeading: `Для ребёнка младшего возраста.`,
//       question: "11. Ваш ребёнок носит брекеты.",
//       answers: {
//         u6: "Да",
//         v6: "Нет",
//       },
//       message: "",
//       correctAnswer: "u6",
//       wrongAnswers: "v6"
//     },
//     // {
//     //   heading: "Для ребёнка младшего возраста. (от 24 или 30 месяцев до 5 лет).",
//     //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
//     //   answers: {
//     //     w6: "Да",
//     //     x6: "Нет",
//     // //   },
//     // message: "",
//     //   correctAnswer: "w6",
//     //   wrongAnswers: "x6"
//     // },
//     // {
//     //   heading: "Для ребёнка младшего возраста. (от 24 или 30 месяцев до 5 лет).",
//     //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
//     //   answers: {
//     //     y6: "Да",
//     //     z6: "Нет",
//     // //   },
//     // message: "",
//     //   correctAnswer: "y6",
//     //   wrongAnswers: "z6"
//     // },
//     // {
//     //   heading: "Для ребёнка младшего возраста. (от 24 или 30 месяцев до 5 лет).",
//     //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
//     //   answers: {
//     //     y5: "Да",
//     //     z5: "Нет",
//     // //   },
//     // message: "",
//     //   correctAnswer: "y5"
//     // },
//     // {
//     //   heading: "Для ребёнка младшего возраста. (от 24 или 30 месяцев до 5 лет).",
//     //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
//     //   answers: {
//     //     y5: "Да",
//     //     z5: "Нет",
//     // //   },
//     // message: "",
//     //   correctAnswer: "y5"
//     // },
//   ];

//   // Kick things off
//   buildQuiz();

//   // Pagination
//   const previousButton = document.getElementById("previous");
//   const nextButton = document.getElementById("next");
//   const slides = document.querySelectorAll(".slide");
//   let currentSlide = 0;

//   // Show the first slide
//   showSlide(currentSlide);

//   // Event listeners
//   submitButton.addEventListener('click', showResults);
//   previousButton.addEventListener("click", showPreviousSlide);
//   nextButton.addEventListener("click", showNextSlide);
  
  
//   // let checkedInp = false
//   // inptest.addEventListener("change", function(event) {
//   //     if(event.target.checked){
//   //       checkedInp = true
//   //       console.log(event.target.checked)
//   //     }
//   // })
//   // nextButton.addEventListener("click", function(){
//   //   if(!checkedInp) {
//   //     return alert("Заполните поле")
//   //   } else if(checkedInp){
//   //     checkedInp != checkedInp 
//   //   }
    
//   // })
// })();

// if(document.querySelector("#kgz")){
//   (function(){
//     // Functions
//     function buildQuiz(){
//       // variable to store the HTML output
//       const output = [];
  
//       // for each question...
//       myQuestions.forEach(
//         (currentQuestion, questionNumber) => {
  
//           // variable to store the list of possible answers
//           const answers = [];
  
//           // and for each available answer...
//           for(letter in currentQuestion.answers){
//             console.log(letter)
//             // ...add an HTML radio button
//             answers.push(
//               `
//               <div id="wrapped">
//                 <input type="radio" id="test-${letter}" class="test-input" name="question${questionNumber}" value="${letter}"/>
//                 <label for="test-${letter}">
//                       ${currentQuestion.answers[letter]}
//                 </label>
//               </div>
//               `
//             );
//           }
  
//           // add this question and its answers to the output
//           output.push(
//             `<div class="slide">
//               <pre class="quiz-heading">${currentQuestion.heading}</pre>
//               <pre class="quiz-sub-heading">${currentQuestion.subHeading}</pre>
//               <div class="question"> ${currentQuestion.question}</div>
//               <div class="answers"> ${answers.join("")} </div>
//               <div class="quiz-message">${currentQuestion.message}</div>
//             </div>`
//           );
//         }
//       );
  
//       // finally combine our output list into one string of HTML and put it on the page
//       quizContainer.innerHTML = output.join('');
//     }
  
//     function showResults(){
  
//       // gather answer containers from our quiz
//       const answerContainers = quizContainer.querySelectorAll('.answers');
  
//       // keep track of user's answers
//       let numCorrect = 0;
//       let wAnswers = 0;
  
//       // for each question...
//       myQuestions.forEach( (currentQuestion, questionNumber) => {
  
//         // find selected answer
//         const answerContainer = answerContainers[questionNumber];
//         const selector = `input[name=question${questionNumber}]:checked`;
//         const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
//         // if answer is correct
//         if(userAnswer === currentQuestion.correctAnswer){
//           // add to the number of correct answers
//           numCorrect++;
  
//           // color the answers green
//           // answerContainers[questionNumber].style.color = 'lightgreen';
//         } else if(userAnswer === currentQuestion.wrongAnswers){
//           wAnswers++
//         }
//         // if answer is wrong or blank
//         else{
//           // color the answers red
//           // answerContainers[questionNumber].style.color = 'red';
//         }
//       });
  
//       const resultsInfo = document.querySelector(".quiz-form");    

//       if(numCorrect + wAnswers >= 21) {
//         resultsInfo.innerHTML = `
//         <div>
//         Ооба (бардыгы): ${numCorrect}
//         Жок (бардыгы): ${wAnswers}
//         «ООБА» деген жооп канчалык көп болсо, балага остеопатикалык жардам ошончолук зарыл.
//         Бүтүм.
//         Бул суроолордун бардыгы сизди жана үй-бүлөңүздү кызыктырышы керек. Бул объективдүү көрсөткүчтөр балаңыздын эртерек остеопатикалык краниалдуу текшерүүдөн өтүүсү зарыл экендигин билдирген тынсыздануунун белгиси болуп саналат.
//         Бул тынчсыздануулар балаңыздын абалындагы айрым билинбеген ооруларга, бир аз алсыздануу, тең салмактуулуктун бузулушу же дисфункциянын пайда болушунан улам болушу ыктымал. Бул абалдын кесепеттери болуп иммунитеттин азайышы, ооруга болгон алдын ала калыптануу, органдардын ооруну тез кабыл алуусу болушу мүмкүн.
//         Остеопаттардын эсептөөсүндө, ден-соолукка остеопатикалык жардам керек экендигине ишенген дарылоочу дарыгер бул тынчсыздандыруучу белгилерге кылдат кароосу керек. Алар өз учурунда тиешелүү чараларды көрүүгө, анын ичинде остеопатиялык жардам керек болушу мүмкүн экендигине ишенимдүү болуусу керек.
//         Мында терапевтикалык толуктоо же медицинанын жана остеопатиянын өз ара толукталуусу пайда болот. Ар кандай даражадагы оорулар болгондо бардык күмөн саноолорду четке кагуу үчүн абдан кылдаттык менен текшерүү зарыл.</div>
//         `
//       }

//       // show number of correct answers out of total
//       numCorrect + wAnswers >= 1 && numCorrect + wAnswers <= 8 ? resultsInfo.innerHTML = `
//       <div>Корутунду.
//       <p>ООБА (бардык жооп): ${numCorrect}</p>
//       <p>ЖОК (бардык жооп): ${wAnswers}</p>
//       Эгерде сиз төрөт боюнча берилген суроолордун жок дегенде бирөөсүнө ООБА деп жооп берсеңиз, анда балаңыздын баш сөөгү кандайдыр бир стресске дуушар болгон.
//       Түйүлдүктүн жеңил же кыйынчылык менен ичтен чыгаруусун камсыздай турган жатуунун түрүнө жараша, өз алдынча же акушердин жардамы менен төрөөдө, жаңы төрөлгөн ымыркайдын баш сөөгү аздыр-көптүр катуу стресстерге дуушар болот. Дагы кайталап айткыбыз келет, ар бир төрөт өзгөчө жана өзүнчө түргө ээ. Жеке учурларды жалпы жана универсалдуу мыйзам даражасына көтөрүүгө мүмкүн эмес! Остеопатка төрөттөн кийин, мүмкүнчүлүк болгондо эле дароо баруу керек.</div>
//       `: resultsInfo.innerHTML = `<div>
//       <p>ООБА (бардыгы): ${numCorrect}</p>
//       <p>ЖОК (бардыгы): ${wAnswers}</p>
//       ООБА деген жооп канчалык көп болсо, остеопатка баруу зарылдыгы ошончолук жогору.</div>`;
//     }
  
//     function showSlide(n) {
//       slides[currentSlide].classList.remove('active-slide');
//       slides[n].classList.add('active-slide');
//       currentSlide = n;
//       if(currentSlide === 0){
//         previousButton.style.display = 'none';
//       }
//       else{
//         previousButton.style.display = 'inline-block';
//       }
//       // if(currentSlide > firstBlockQues){
//       //   submitButton.style.display = "inline-block"
//       // }
//       if(currentSlide === slides.length-1){
//         nextButton.style.display = 'none';
//         // submitButton.style.display = 'inline-block';
//       }
//       else{
//         nextButton.style.display = 'inline-block';
//         submitButton.style.display = 'inline-block';
//       }
//     }
  
//     function showNextSlide() {
//       showSlide(currentSlide + 1);
//     }
  
//     function showPreviousSlide() {
//       showSlide(currentSlide - 1);
//     }
  
//     // Variables
//     const quizContainer = document.getElementById('quiz');
//     const resultsContainer = document.getElementById('results');
//     const submitButton = document.getElementById('submit');
//     const myQuestions = [
//       {
//         heading: "АНКЕТА 1.",
//         subHeading: "Төрөттөр.",
//         question: "1. Сиздин төрөтүңүз оор, узак мөөнөттүү, кыска мөөнөттүү же убагынан эрте болгонбу.",
//         answers: {
//           a: "Ооба",
//           b: "Жок",
//         },
//         message: "",
//         correctAnswer: "a",
//         wrongAnswers: "b"
//       },
//       {
//         heading: "АНКЕТА 1.",
//         subHeading: "Төрөттөр.",
//         question: "2. Төрөтүңүз козголгон, тездетилген же кечиктирилгенби.",
//         answers: {
//           c: "Ооба",
//           d: "Жок",
//         },
//         message: "",
//         correctAnswer: "c",
//         wrongAnswers: "d"
//       },
//       {
//         heading: "АНКЕТА 1.",
//         subHeading: "Төрөттөр.",
//         question: '3. Акушерканы күтүүгө туура келген учур болду беле? Сизден төрөттү жасалма жол менен токтотууну сураныштыбы: "жамбашыңызды кысыңыз", төрөт процессин кармоо, ымыркай ылдыйлап калган учурда төрөт бөлүмүнө өз алдынча барууңуз.',
//         answers: {
//           e: "Ооба",
//           f: "Жок",
//         },
//         message: "",
//         correctAnswer: "e",
//         wrongAnswers: "f"
//       },
//       {
//         heading: "АНКЕТА 1.",
//         subHeading: "Төрөттөр.",
//         question: "4. Жатуу сунушу кандай болду? Жүзүңүздү бери каратыппы?",
//         answers: {
//           g: "Ооба",
//           h: "Жок",
//         },
//         message: "",
//         correctAnswer: "g",
//         wrongAnswers: "h"
//       },{
//         heading: "АНКЕТА 1.",
//         subHeading: "Төрөттөр.",
//         question: "5. Жатуу сунушу кандай болду? Жамбаш мененби?",
//         answers: {
//           i: "Ооба",
//           j: "Жок",
//         },
//         message: "",
//         correctAnswer: "i",
//         wrongAnswers: "j"
//       },
//       {
//         heading: "АНКЕТА 1.",
//         subHeading: "Төрөттөр.",
//         question: "6. Төрөт учурунда чымчуурлар, калакчалар же сордургуч аппараттар колдонулганбы?",
//         answers: {
//           k: "Ооба",
//           l: "Жок",
//         },
//         message: "",
//         correctAnswer: "k",
//         wrongAnswers: "l"
//       },
//       {
//         heading: "АНКЕТА 1.",
//         subHeading: "Төрөттөр.",
//         question: "7. Сизде кесарча жаруу (ичтен баланы жарып алуу) операциясы болгонбу? Пландалганбы же шашылышпы?",
//         answers: {
//           m: "Ооба",
//           n: "Жок",
//         },
//         message: "",
//         correctAnswer: "m",
//         wrongAnswers: "n"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "Эмчектеги ымыркайлар үчүн. \n(Эмчектеги бала – бул 10 күндүктөн 24 айга чейинки балдар, айрым дарыгерлер 30 айга чейинкилер деп эсептешет).",
//         question: "1. Ымыркайыңызды көтөргөндө, ороп жатканда, жалаякты алмаштырганда же ага керектүү башка аракеттерди аткарууда табы жоктой, көңүлсүз болуп, ыйлайт.",
//         answers: {
//           o: "Ооба",
//           p: "Жок",
//         },
//         message: "",
//         correctAnswer: "o",
//         wrongAnswers: "p"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "2. Ал калчылдап титрейт, себепсиз эле бүгүлөт же тырышат.",
//         answers: {
//           q: "Ооба",
//           r: "Жок",
//         },
//         message: "",
//         correctAnswer: "q",
//         wrongAnswers: "r"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "3. Колуңузда жатканда же отурганда эч кандай себеби жок эле башын артка чалкалатат.",
//         answers: {
//           s: "Ооба",
//           t: "Жок",
//         },
//         message: "",
//         correctAnswer: "s",
//         wrongAnswers: "t"
  
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: `4. Керебетте жатканда ал ар дайым башына жөлөнгүч издейт, мисалы, керебеттин таякчаларына жөлөнүп.`,
//         answers: {
//           u: "Ооба",
//           v: "Жок",
//         },
//         message: "",
//         correctAnswer: "u",
//         wrongAnswers: "v"
  
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: `5. Жатканда.
//         Ал бир эле капталы менен уктайт.
//         `,
//         answers: {
//           w: "Ооба",
//           x: "Жок",
//         },
//         message: "",
//         correctAnswer: "w",
//         wrongAnswers: "x"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Башын бир тарапка эле бура берет.",
//         answers: {
//           y: "Ооба",
//           z: "Жок",
//         },
//         message: "",
//         correctAnswer: "y",
//         wrongAnswers: "z"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Анын башы дайыма абдан түздөнгөн абалда болот, ал артка карай абдан чалкалайт (мындай учурда анын моюну менен керебеттин ортосунда боштук болот).",
//         answers: {
//           a1: "Ооба",
//           b1: "Жок",
//         },
//         message: "",
//         correctAnswer: "a1",
//         wrongAnswers: "b1"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "6. Жатканда, баланын башы денеси менен бирдей деңгээлде болгондо, карагыла, анын колдорунун жана буттарынын учтары кандай. Алар асимметриялык абалда болот.",
//         answers: {
//           c1: "Ооба",
//           d1: "Жок",
//         },
//         message: "",
//         correctAnswer: "c1",
//         wrongAnswers: "d1"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "7. Ал чалкасынан жаткырганда пияз сыяктуу бүгүлөт.",
//         answers: {
//           e1: "Ооба",
//           f1: "Жок",
//         },
//         message: "",
//         correctAnswer: "e1",
//         wrongAnswers: "f1"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "8. Аны чалкасынан жаткырганда уктабастан, мындай абалды жагымсыз же ыңгайсыз эсептөө менен андан качат.",
//         answers: {
//           g1: "Ооба",
//           h1: "Жок",
//         },
//         message: "",
//         correctAnswer: "g1",
//         wrongAnswers: "h1"
//       },
//       // {
//       //   heading: "АНКЕТА 2.",
//       //   subHeading: "",
//       //   question: "Кежигесине.",
//       //   answers: {
//       //     i1: "Ооба",
//       //     j1: "Жок",
//       //   },
//       //   message: "",
//       //   correctAnswer: "i1",
//       //   wrongAnswers: "j1"
//       // },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: `9. Баланы жуунтуп жатканда, эгер тийип алсаңыз, ал кыйкырат: 
//         Башына.`,
//         answers: {
//           k1: "Ооба",
//           l1: "Жок",
//         },
//         message: "",
//         correctAnswer: "k1",
//         wrongAnswers: "l1"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Кежигесине.",
//         answers: {
//           m1: "Ооба",
//           n1: "Жок",
//         },
//         message: "",
//         correctAnswer: "m1",
//         wrongAnswers: "n1"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Денесинин башка бөлүктөрүнө.",
//         answers: {
//           o1: "Ооба",
//           p1: "Жок",
//         },
//         message: "",
//         correctAnswer: "o1",
//         wrongAnswers: "p1"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "10. Эгерде кежигесинин жогорку бөлүгүнө тийсеңиз ал бат-баттан ыйлайт.",
//         answers: {
//           q1: "Ооба",
//           r1: "Жок",
//         },
//         message: "",
//         correctAnswer: "q1",
//         wrongAnswers: "r1"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "11. Ал эч белгисиз себептер менен эле чыңырган, кыңылдаган үндөрдү чыгарат.",
//         answers: {
//           s1: "Ооба",
//           t1: "Жок",
//         },
//         message: "",
//         correctAnswer: "s1",
//         wrongAnswers: "t1"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Ымыркай эч себепсиз эле ар дайым же тез-тезден ыйлайт.",
//         answers: {
//           u1: "Ооба",
//           v1: "Жок",
//         },
//         message: "",
//         correctAnswer: "u1",
//         wrongAnswers: "v1"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "12. Ымыркайдын шилекейи көп агат, ал шилекей агызганды жакшы көрөт.",
//         answers: {
//           w1: "Ооба",
//           x1: "Жок",
//         },
//         message: "",
//         correctAnswer: "w1",
//         wrongAnswers: "x1"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: `13. Ымыркайыңыздын эмчек эмүүсү жакшы.`,
//         answers: {
//           y1: "Ооба",
//           z1: "Жок",
//         },
//         message: "",
//         correctAnswer: "y1",
//         wrongAnswers: "z1"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Аны мажбурлап эмизүү керек же упчу берүү керек.",
//         answers: {
//           a2: "Ооба",
//           b2: "Жок",
//         },
//         message: "",
//         correctAnswer: "a2",
//         wrongAnswers: "b2"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: `14. Эмчек эмизгенден кийин же упчу менен тойгузгандан кийин балаңыз: 
//         Системалуу түрдө кусат.`,
//         answers: {
//           c2: "Ооба",
//           d2: "Жок",
//         },
//         message: "",
//         correctAnswer: "c2",
//         wrongAnswers: "d2"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Бат-баттан же системалуу түрдө окшуйт.",
//         answers: {
//           e2: "Ооба",
//           f2: "Жок",
//         },
//         message: "",
//         correctAnswer: "e2",
//         wrongAnswers: "f2"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Ал бат-баттан кекирет.",
//         answers: {
//           g2: "Ооба",
//           h2: "Жок",
//         },
//         message: "",
//         correctAnswer: "g2",
//         wrongAnswers: "h2"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Ал бат-баттан ыктытат.",
//         answers: {
//           i2: "Ооба",
//           j2: "Жок",
//         },
//         message: "Кусуу – бул тамакты аздыр-көптүр чыгарып таштоо, болгону бир нече куб.см суюктук же сүттү бир учурда же кайталап чыгарып таштоо. Ал нормада болгондо көлөмү көбөйбөшү керек, кофенин үч кашыгы менен барабар. Кусууну окшуу менен айырмалай билиш керек.",
//         correctAnswer: "i2",
//         wrongAnswers: "j2"
//       },
//       // {
//       //   heading: "АНКЕТА 2.",
//       //   subHeading: "",
//       //   question: "Кусуу – бул тамакты аздыр-көптүр чыгарып таштоо, болгону бир нече куб.см суюктук же сүттү бир учурда же кайталап чыгарып таштоо. Ал нормада болгондо көлөмү көбөйбөшү керек, кофенин үч кашыгы менен барабар. Кусууну окшуу менен айырмалай билиш керек.",
//         // answers: {
//         //   k2: "Ооба",
//         //   l2: "Жок",
//         // },
//         // message: "",
//         // correctAnswer: "k2",
//         // wrongAnswers: "l2"
//       // },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "15. Ымыркайыңыз тамакты кыйынчылык менен жутат.",
//         answers: {
//           m2: "Ооба",
//           n2: "Жок",
//         },
//         message: "",
//         correctAnswer: "m2",
//         wrongAnswers: "n2"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Кыйынчылык менен эмчек эмет.",
//         answers: {
//           o2: "Ооба",
//           p2: "Жок",
//         },
//         message: "",
//         correctAnswer: "o2",
//         wrongAnswers: "p2"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "16. Сиз ымыркайды колго алганда, анын дем алуусу кыйын болуп жаткандыгын угасыз.",
//         answers: {
//           q2: "Ооба",
//           r2: "Жок",
//         },
//         message: "",
//         correctAnswer: "q2",
//         wrongAnswers: "r2"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: `17. Ымыркайдын ар бир кыймылын байкоо менен карайыз:
//         Ал өзүнүн жашына жараша жетишерлик кыймылда болуп жатабы жана активдүүбү.`,
//         answers: {
//           s2: "Ооба",
//           t2: "Жок",
//         },
//         message: "",
//         correctAnswer: "s2",
//         wrongAnswers: "t2"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Ал сергек эмес, алы жок жана кыймылы жетишерлик эмес.",
//         answers: {
//           u2: "Ооба",
//           v2: "Жок",
//         },
//         message: "",
//         correctAnswer: "u2",
//         wrongAnswers: "v2"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Ал сизге тынчсызданган жана ашыкча кыжырданган сыяктуу сезилет.",
//         answers: {
//           w2: "Ооба",
//           x2: "Жок",
//         },
//         message: "",
//         correctAnswer: "w2",
//         wrongAnswers: "x2"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "18. Күндүзү сиздин ымыркай абдан тез-тезден жана көпкө чейин уктайт, түнкүсүн жакшы уктагандыгына карабастан.",
//         answers: {
//           y2: "Ооба",
//           z2: "Жок",
//         },
//         message: "",
//         correctAnswer: "y2",
//         wrongAnswers: "z2"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Ал күндү түн менен алмаштырат. Күндүзү уктайт, түнү сергек болот.",
//         answers: {
//           a3: "Ооба",
//           b3: "Жок",
//         },
//         message: "",
//         correctAnswer: "a3",
//         wrongAnswers: "b3"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Аны ар дайым терметип жана уктаганга ынандырып туруу керек.",
//         answers: {
//           c3: "Ооба",
//           d3: "Жок",
//         },
//         message: "",
//         correctAnswer: "c3",
//         wrongAnswers: "d3"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Ал кыйынчылык менен уктайт.",
//         answers: {
//           e3: "Ооба",
//           f3: "Жок",
//         },
//         message: "",
//         correctAnswer: "e3",
//         wrongAnswers: "f3"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Ал ар дайым уктаар алдында жана ойгонгон маалда ыйлайт.",
//         answers: {
//           g3: "Ооба",
//           h3: "Жок",
//         },
//         message: "",
//         correctAnswer: "g3",
//         wrongAnswers: "h3"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Ал системалуу түрдө себепсиз ыйлоо менен сизди түнкүсүн ойготот.",
//         answers: {
//           i3: "Ооба",
//           j3: "Жок",
//         },
//         message: "",
//         correctAnswer: "i3",
//         wrongAnswers: "j3"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Ал уйкусуздук менен көп кыйналат.",
//         answers: {
//           k3: "Ооба",
//           l3: "Жок",
//         },
//         message: "",
//         correctAnswer: "k3",
//         wrongAnswers: "l3"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "19. Сиз балаңыз ыйлап жатканда анын эки көзүнөн тең жаш агып жатканын байкайсыз.",
//         answers: {
//           m3: "Ооба",
//           n3: "Жок",
//         },
//         message: "",
//         correctAnswer: "m3",
//         wrongAnswers: "n3"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Жашы бир гана көзүнөн чыгат.",
//         answers: {
//           o3: "Ооба",
//           p3: "Жок",
//         },
//         message: "",
//         correctAnswer: "o3",
//         wrongAnswers: "p3"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Анын башында, баш терисинин чачтуу бөлүгүндө шишик бар (сероздуу-канталаган шишик).",
//         answers: {
//           q3: "Ооба",
//           r3: "Жок",
//         },
//         message: "",
//         correctAnswer: "q3",
//         wrongAnswers: "r3"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Анын бети же башы кыйшык (ассимметриялуу).",
//         answers: {
//           s3: "Ооба",
//           t3: "Жок",
//         },
//         message: "",
//         correctAnswer: "s3",
//         wrongAnswers: "t3"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Анын башынын бир тарабы көбүрөөк жалпак.",
//         answers: {
//           u3: "Ооба",
//           v3: "Жок",
//         },
//         message: "",
//         correctAnswer: "u3",
//         wrongAnswers: "v3"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "20. Сиз балаңыздын жалаягын алмаштыруу үчүн столдун үстүнө жаткызганда, анын кыр аркалары түз жана аз кыймылдуу болгондой сезилет.",
//         answers: {
//           w3: "Ооба",
//           x3: "Жок",
//         },
//         message: "",
//         correctAnswer: "w3",
//         wrongAnswers: "x3"
//       },
//       {
//         heading: "АНКЕТА 2.",
//         subHeading: "",
//         question: "Бала толугу менен алсыз жана ыйлабай калган маалда сиз аны курсагы менен колуңузга жаткырасыз жана анын курсагы чыңалып турганын билесиз.",
//         answers: {
//           y3: "Ооба",
//           z3: "Жок",
//         },
//         message: "",
//         correctAnswer: "y3",
//         wrongAnswers: "z3"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: `Кенже курактагы балдар үчүн
//         (24 же 30 айдан баштап 5 жашка чейин).`,
//         question: "1. Балаңыз отит менен көп ооруйт.",
//         answers: {
//           a4: "Ооба",
//           b4: "Жок",
//         },
//         message: "",
//         correctAnswer: "a4",
//         wrongAnswers: "b4"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Отиттер оңой менен айыкпайт жана кайталанып турат.",
//         answers: {
//           c4: "Ооба",
//           d4: "Жок",
//         },
//         message: "",
//         correctAnswer: "c4",
//         wrongAnswers: "d4"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Балаңыздын угуусунун начарлагандыгы байкалууда.",
//         answers: {
//           e4: "Ооба",
//           f4: "Жок",
//         },
//         message: "",
//         correctAnswer: "e4",
//         wrongAnswers: "f4"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Ага кулагын тазалоону дайындашат.",
//         answers: {
//           g4: "Ооба",
//           h4: "Жок",
//         },
//         message: "",
//         correctAnswer: "g4",
//         wrongAnswers: "h4"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "2. Балаңыз жыл боюу мурду бүткөн абалда жүрөт.",
//         answers: {
//           i4: "Ооба",
//           j4: "Жок",
//         },
//         message: "",
//         correctAnswer: "i4",
//         wrongAnswers: "j4"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Ар кандай медициналык дарылоолорго карабастан мурдунун бүтүүсү кайталана берет.",
//         answers: {
//           k4: "Ооба",
//           l4: "Жок",
//         },
//         message: "",
//         correctAnswer: "k4",
//         wrongAnswers: "l4"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Полиптерден (былжыр челдердин өсүндүлөрү) тазалангандан кийин ал суук тийгизип алууга жакын.",
//         answers: {
//           m4: "Ооба",
//           n4: "Жок",
//         },
//         message: "",
//         correctAnswer: "m4",
//         wrongAnswers: "n4"
//       },
//       // {
//       //   heading: "АНКЕТА 3.",
//       //   subHeading: "",
//       //   question: "Он всё время дышит ртом.",
//       //   answers: {
//       //     o4: "Ооба",
//       //     p4: "Жок",
//       //   },
//       // message: "",
//       //   correctAnswer: "o4",
//       //   wrongAnswers: "p4"
//       // },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Ар кандай медициналык дарыланууларга карабастан, ал ар дайым ринофарингит менен ооруйт.",
//         answers: {
//           q4: "Ооба",
//           r4: "Жок",
//         },
//         message: "",
//         correctAnswer: "q4",
//         wrongAnswers: "r4"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Ал ар дайым оозу менен дем алат.",
//         answers: {
//           s4: "Ооба",
//           t4: "Жок",
//         },
//         message: "",
//         correctAnswer: "s4",
//         wrongAnswers: "t4"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "3. Балаңыз жыгылды беле? Ал жалаяк алмаштыруучу столдон кулаган эмес.",
//         answers: {
//           u4: "Ооба",
//           v4: "Жок",
//         },
//         message: "",
//         correctAnswer: "u4",
//         wrongAnswers: "v4"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Балаңыз көп жыгылат.",
//         answers: {
//           w4: "Ооба",
//           x4: "Жок",
//         },
//         message: "",
//         correctAnswer: "w4",
//         wrongAnswers: "x4"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Ал жыгылганда, ар дайым башын уруп алат.",
//         answers: {
//           y4: "Ооба",
//           z4: "Жок",
//         },
//         message: "",
//         correctAnswer: "y4",
//         wrongAnswers: "z4"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Ал көтөнү менен катуу отуруп калды, бирок анчалык деле кесепеттери жок.",
//         answers: {
//           a5: "Ооба",
//           b5: "Жок",
//         },
//         message: "",
//         correctAnswer: "a5",
//         wrongAnswers: "b5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Ал бети менен жыгылды жана бети көгөрдү, аны бетке чабышты, ал ээгине, башынын аркасына сокку алды, бирок анчалык деле көрүнүктүү бузуулар жана кесепеттери жок (рентген сүрөтү нормалдуу).",
//         answers: {
//           c5: "Ооба",
//           d5: "Жок",
//         },
//         message: "",
//         correctAnswer: "c5",
//         wrongAnswers: "d5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Ал курсагы менен кулады.",
//         answers: {
//           e5: "Ооба",
//           f5: "Жок",
//         },
//         message: "",
//         correctAnswer: "e5",
//         wrongAnswers: "f5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Соккудан улам анын деми кыстыгып калды.",
//         answers: {
//           g5: "Ооба",
//           h5: "Жок",
//         },
//         message: "",
//         correctAnswer: "g5",
//         wrongAnswers: "h5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Кагылышкан учурда ал машинада болчу, машина катуу сокку алганы менен ал жабыр тарткан жок жана көрүнүктүү кесепеттери болгон жок.",
//         answers: {
//           i5: "Ооба",
//           j5: "Жок",
//         },
//         message: "",
//         correctAnswer: "i5",
//         wrongAnswers: "j5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "4. Ал араң басып жүрсө дагы, сколиоз экени чындык. Бул рентгенограммада тастыкталат.",
//         answers: {
//           k5: "Ооба",
//           l5: "Жок",
//         },
//         message: "",
//         correctAnswer: "k5",
//         wrongAnswers: "l5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "5. Анын бир көзү кыйшык.",
//         answers: {
//           m5: "Ооба",
//           n5: "Жок",
//         },
//         message: "",
//         correctAnswer: "m5",
//         wrongAnswers: "n5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Анын эки көзү тең кыйшык.",
//         answers: {
//           o5: "Ооба",
//           p5: "Жок",
//         },
//         message: "",
//         correctAnswer: "o5",
//         wrongAnswers: "p5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "6. Анын көздөрү ассиметриялуу түрдө жайгашкан.",
//         answers: {
//           q5: "Ооба",
//           r5: "Жок",
//         },
//         message: "",
//         correctAnswer: "q5",
//         wrongAnswers: "r5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "7. Анын көзүндө олуттуу көйгөйлөрү бар.",
//         answers: {
//           s5: "Ооба",
//           t5: "Жок",
//         },
//         message: "",
//         correctAnswer: "s5",
//         wrongAnswers: "t5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Ал көз айнек же линза тагынышы керек.",
//         answers: {
//           u5: "Ооба",
//           v5: "Жок",
//         },
//         message: "",
//         correctAnswer: "u5",
//         wrongAnswers: "v5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Менин балам алысты көрбөйт.",
//         answers: {
//           w5: "Ооба",
//           x5: "Жок",
//         },
//         message: "",
//         correctAnswer: "w5",
//         wrongAnswers: "x5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Менин балам алысты жакшы көрөт.",
//         answers: {
//           y5: "Ооба",
//           z5: "Жок",
//         },
//         message: "",
//         correctAnswer: "y5",
//         wrongAnswers: "z5"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Менин балам астигматизм менен жабыркайт.",
//         answers: {
//           a6: "Ооба",
//           b6: "Жок",
//         },
//         message: "",
//         correctAnswer: "a6",
//         wrongAnswers: "b6"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "8. Анын жаагынын ылдыйкы бөлүгү абдан эле алдыга чыгып турат же артка кирип турат.",
//         answers: {
//           c6: "Ооба",
//           d6: "Жок",
//         },
//         message: "",
//         correctAnswer: "c6",
//         wrongAnswers: "d6"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Анын жаагынын жогорку бөлүгү алдыга абдан эле чыгып турат же артка кирип турат.",
//         answers: {
//           e6: "Ооба",
//           f6: "Жок",
//         },
//         message: "",
//         correctAnswer: "e6",
//         wrongAnswers: "f6"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "9. Анын оозу ар дайым ачык болуп, тиштенип алат.",
//         answers: {
//           g6: "Ооба",
//           h6: "Жок",
//         },
//         message: "",
//         correctAnswer: "g6",
//         wrongAnswers: "h6"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Ал жакшы тиштей албайт, тиштери бири-бирине тийбейт.",
//         answers: {
//           i6: "Ооба",
//           j6: "Жок",
//         },
//         message: "Нормалдуу тиштер бирдей жайгашат, ал эми жогорку жаактагы тиштер төмөнкү жаактагы тиштерге жеңил кирип турат.",
//         correctAnswer: "i6",
//         wrongAnswers: "j6"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Алдыңкы тиштердин ортосунда жаракалар бар же бош орун бар.",
//         answers: {
//           k6: "Ооба",
//           l6: "Жок",
//         },
//         message: "Нормада алдыңкы азуу тиштердин ортосунда бош орун болбошу керек.",
//         correctAnswer: "k6",
//         wrongAnswers: "l6"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Балаңыз ар дайым бир же эки манжасын, өзүнүн упчусун же башка нерсени соро берет.",
//         answers: {
//           m6: "Ооба",
//           n6: "Жок",
//         },
//         message: "",
//         correctAnswer: "m6",
//         wrongAnswers: "n6"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Анын тили алдыңкы тиштердин ортосундагы жаракадан оңой өтөт.",
//         answers: {
//           o6: "Ооба",
//           p6: "Жок",
//         },
//         message: "",
//         correctAnswer: "o6",
//         wrongAnswers: "p6"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "10. Балаңыздан оозун ачуусун сураныңыз жана ооз көңдөйүн караңыз. Анын жогорку татаңдайын жана тамагын чөнтөк фонарын жандырып алып караңыз. Анын таңдайы бийик жана оюулган болот.",
//         answers: {
//           q6: "Ооба",
//           r6: "Жок",
//         },
//         message: "Бул баланын ар дайым бармагын же упчуну соргонунан пайда болот. Таңдай көтөрүлөт. Анда манжанын же упчунун изи калат. Таңдай бузулат, тиштери жана жаактын жогорку бөлүгү бузулат. Эне өзүнүн манжасы менен таңдайдын тереңдигин билет.",
//         correctAnswer: "q6",
//         wrongAnswers: "r6"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Көз болжол менен караганда таңдай кууш болот.",
//         answers: {
//           s6: "Ооба",
//           t6: "Жок",
//         },
//         message: "",
//         correctAnswer: "s6",
//         wrongAnswers: "t6"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "Көз болжол менен баланын таңдайы кеңейген.",
//         answers: {
//           u6: "Ооба",
//           v6: "Жок",
//         },
//         message: "Көбүнчө жогорку (терең) таңдайлар кууш болот. Жалпак таңдайлар кең болот.",
//         correctAnswer: "u6",
//         wrongAnswers: "v6"
//       },
//       {
//         heading: "АНКЕТА 3.",
//         subHeading: "",
//         question: "11. Сиздин балаңыз брекет кийет.",
//         answers: {
//           w6: "Ооба",
//           x6: "Жок",
//         },
//         message: "",
//         correctAnswer: "w6",
//         wrongAnswers: "x6"
//       },
//       // {
//       //   heading: "АНКЕТА 3.",
//       //   subHeading: "",
//       //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
//       //   answers: {
//       //     y6: "Да",
//       //     z6: "Нет",
//       //   },
//       //   correctAnswer: "y6",
//       //   wrongAnswers: "z6"
//       // },
//       // {
//       //   heading: "АНКЕТА 3.",
//       //   subHeading: "",
//       //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
//       //   answers: {
//       //     y5: "Да",
//       //     z5: "Нет",
//       //   },
//       //   correctAnswer: "y5"
//       // },
//       // {
//       //   heading: "АНКЕТА 3.",
//       //   subHeading: "",
//       //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
//       //   answers: {
//       //     y5: "Да",
//       //     z5: "Нет",
//       //   },
//       //   correctAnswer: "y5"
//       // },
//     ];
  
//     // Kick things off
//     buildQuiz();
  
//     // Pagination
//     const previousButton = document.getElementById("previous");
//     const nextButton = document.getElementById("next");
//     const slides = document.querySelectorAll(".slide");
//     let currentSlide = 0;
  
//     // Show the first slide
//     showSlide(currentSlide);
  
//     // Event listeners
//     submitButton.addEventListener('click', showResults);
//     previousButton.addEventListener("click", showPreviousSlide);
//     nextButton.addEventListener("click", showNextSlide);
//   })();
// }