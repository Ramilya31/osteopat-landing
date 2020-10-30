let button = document.querySelector("#test-btn") 

function addForm(){
  let testBlock = document.querySelector(".test-block")
  let formBlock = document.querySelector('.form-block')
  formBlock.classList.add("d-block")
  testBlock.classList.add("d-none")
  }
button.addEventListener("click", addForm)

async function handleSubmit(e) {
  e.preventDefault()
  const name = document.querySelector("#name-inp").value;
  const phone = document.querySelector("#password-inp").value;
  console.log(name, phone)
  if(name === "" || phone === "" ) return alert("Заполните поля") 
  try {
    const response = await fetch("http://localhost:5000/api/user-info/add", {
    method: "POST",
    body: {
      "name": name,
      "phone": phone
    }, 
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "http://localhost:5000/api/user-info/add"
    }
  })
  const json = await response.json
  console.log("Успех", JSON.stringify(json))
  } catch (error) {
    console.error('Ошибка:', error);
  }
  document.querySelector('.form-submit').classList.add("d-none")
  document.querySelector('.quiz-form').classList.add("d-block")
}

// ---------------Qiuz------------------


(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){
          console.log(letter)
          // ...add an HTML radio button
          answers.push(
            `<form>
              <input type="checkbox" id="test-${letter}" name="question${questionNumber}" value="${letter}" style="background: #333">
              <label for="test-${letter}">
                ${currentQuestion.answers[letter]}
              </label>
            </form>
            `
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="quiz-heading">${currentQuestion.heading}</div>
            <pre class="quiz-sub-heading">${currentQuestion.subHeading}</pre>
            <div class="question"> ${currentQuestion.question}</div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = -1;
    let wAnswers = 0

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        // answerContainers[questionNumber].style.color = 'lightgreen';
      } else if(userAnswer === currentQuestion.wrongAnswers){
        wAnswers++
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        // answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    numCorrect + wAnswers >= 1 && numCorrect + wAnswers <= 8 ? resultsContainer.innerHTML = `<div>
    <p>Сумма всех ДА: ${numCorrect}</p>
    <p>Сумма всех НЕТ: ${wAnswers}</p>
    Если вы ответили ДА хотя бы на один из поставленных по родам вопросов, вполне очевидно, что череп вашего малыша подвергся некоторому напряжению.
    По типу предлежания, обеспечивающему лёгкое или трудное изгнание плода, самостоятельные роды или родовспоможение, череп новорождённого испытает более или менее сильные нагрузки.
    Хочется ещё раз повторить, что каждые роды особые и единственные в своём роде. Нельзя частный случай возводить в ранг общего и универсального закона!
    Визит к остеопату необходим сразу же после родов, как только появляется для него возможность.</div>` : resultsContainer.innerHTML = `<div><p>Сумма всех ДА: ${numCorrect}</p>
    <p>Сумма всех НЕТ: ${wAnswers}</p>
    Чем больше ответов ДА, тем больше необходимость посетить остеопата.</div>`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    // if(currentSlide > firstBlockQues){
    //   submitButton.style.display = "inline-block"
    // }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      // submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'inline-block';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      heading: "АНКЕТА 1.",
      subHeading: "Роды.",
      question: "Ваши роды были трудными, долгосрочными, краткосрочными или преждевременными.",
      answers: {
        a: "Да",
        b: "Нет",
      },
      correctAnswer: "a",
      wrongAnswers: "b"
    },
    {
      heading: "АНКЕТА 1.",
      subHeading: "Роды.",
      question: "Ваши роды были спровоцированы, ускорены или замедлены.",
      answers: {
        c: "Да",
        d: "Нет",
      },
      correctAnswer: "c",
      wrongAnswers: "d"
    },
    {
      heading: "АНКЕТА 1.",
      subHeading: "Роды.",
      question: "Вам пришлось дожидаться акушера? Вас просили искусственно задержать роды: «сжать бёдра», сдерживать процесс родов, идти самой в родильное отделение в тот момент, когда ребёнок лежал уже очень низко.",
      answers: {
        e: "Да",
        f: "Нет",
      },
      correctAnswer: "e",
      wrongAnswers: "f"
    },
    {
      heading: "АНКЕТА 1.",
      subHeading: "Роды.",
      question: "Каково было предлежание? Лицом?",
      answers: {
        g: "Да",
        h: "Нет",
      },
      correctAnswer: "g",
      wrongAnswers: "h"
    },{
      heading: "АНКЕТА 1.",
      subHeading: "Роды.",
      question: "Каково было предлежание? Ягодицами?",
      answers: {
        i: "Да",
        j: "Нет",
      },
      correctAnswer: "i",
      wrongAnswers: "j"
    },
    {
      heading: "АНКЕТА 1.",
      subHeading: "Роды.",
      question: "Использовались ли щипцы, шпатель или вантуз при родах?",
      answers: {
        k: "Да",
        l: "Нет",
      },
      correctAnswer: "k",
      wrongAnswers: "l"
    },
    {
      heading: "АНКЕТА 1.",
      subHeading: "Роды.",
      question: "Было ли у вас кесарево сечение? Плановое или в срочном порядке?",
      answers: {
        m: "Да",
        n: "Нет",
      },
      correctAnswer: "m",
      wrongAnswers: "n"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Ваш малыш выказывает признаки недовольства, он плачет, когда его берут на руки, пеленают, меняют подгузники или выполняют другие необходимые ему манипуляции.",
      answers: {
        o: "Да",
        p: "Нет",
      },
      correctAnswer: "o",
      wrongAnswers: "p"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он судорожно вздрагивает, выгибается или напрягается без видимой причины.",
      answers: {
        q: "Да",
        r: "Нет",
      },
      correctAnswer: "q",
      wrongAnswers: "r"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Лёжа или сидя у вас на руках он запрокидывает назад голову без явной на то причины.",
      answers: {
        s: "Да",
        t: "Нет",
      },
      correctAnswer: "s",
      wrongAnswers: "t"

    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Лёжа в кроватке, он пытается всё время искать опору для головы, опираясь, например, о прутья кроватки.",
      answers: {
        u: "Да",
        v: "Нет",
      },
      correctAnswer: "u",
      wrongAnswers: "v"

    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Лёжа. Он спит на одном и том же боку.",
      answers: {
        w: "Да",
        x: "Нет",
      },
      correctAnswer: "w",
      wrongAnswers: "x"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он поворачивает голову в одну и ту же сторону.",
      answers: {
        y: "Да",
        z: "Нет",
      },
      correctAnswer: "y",
      wrongAnswers: "z"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Его голова находится в положении постоянного гиперразгибания, она сильно запрокинута назад (в этом случае образуется свободное пространство между его шеей и кроваткой).",
      answers: {
        a1: "Да",
        b1: "Нет",
      },
      correctAnswer: "a1",
      wrongAnswers: "b1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Лёжа, когда голова ребёнка лежит на одной оси с телом, посмотрите, как ведут себя верхние и нижние конечности. Они занимают асимметричное положение.",
      answers: {
        c1: "Да",
        d1: "Нет",
      },
      correctAnswer: "c1",
      wrongAnswers: "d1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он выгибается , как лук, когда лежит на спине.",
      answers: {
        e1: "Да",
        f1: "Нет",
      },
      correctAnswer: "e1",
      wrongAnswers: "f1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он не спит лёжа на спине, а избегает такого положения, считая его неприятным или неудобным.",
      answers: {
        g1: "Да",
        h1: "Нет",
      },
      correctAnswer: "g1",
      wrongAnswers: "h1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Когда вы моете вашего малыша, он кричит, если вы дотрагиваетесь до его: Головы.",
      answers: {
        i1: "Да",
        j1: "Нет",
      },
      correctAnswer: "i1",
      wrongAnswers: "j1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Когда вы моете вашего малыша, он кричит, если вы дотрагиваетесь до его: Затылка.",
      answers: {
        k1: "Да",
        l1: "Нет",
      },
      correctAnswer: "k1",
      wrongAnswers: "l1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Когда вы моете вашего малыша, он кричит, если вы дотрагиваетесь до его: Других частей тела.",
      answers: {
        m1: "Да",
        n1: "Нет",
      },
      correctAnswer: "m1",
      wrongAnswers: "n1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он плачет систематически, если вы касаетесь верхней части его затылка.",
      answers: {
        o1: "Да",
        p1: "Нет",
      },
      correctAnswer: "o1",
      wrongAnswers: "p1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он издаёт пронзительные крики, хнычет без всякой очевидной причины.",
      answers: {
        q1: "Да",
        r1: "Нет",
      },
      correctAnswer: "q1",
      wrongAnswers: "r1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Малыш постоянно или часто плачет без видимой причины.",
      answers: {
        s1: "Да",
        t1: "Нет",
      },
      correctAnswer: "s1",
      wrongAnswers: "t1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "У малыша обильное слюноотделение, он любит пускать слюни.",
      answers: {
        u1: "Да",
        v1: "Нет",
      },
      correctAnswer: "u1",
      wrongAnswers: "v1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Ваш младенец хорошо сосёт грудь.",
      answers: {
        w1: "Да",
        x1: "Нет",
      },
      correctAnswer: "w1",
      wrongAnswers: "x1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Его нужно заставлять брать грудь или рожок.",
      answers: {
        y1: "Да",
        z1: "Нет",
      },
      correctAnswer: "y1",
      wrongAnswers: "z1"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "После кормления грудью или после рожка ваш ребёнок: Систематически срыгивает",
      answers: {
        a2: "Да",
        b2: "Нет",
      },
      correctAnswer: "a2",
      wrongAnswers: "b2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Имеет частую или систематическую рвоту.",
      answers: {
        c2: "Да",
        d2: "Нет",
      },
      correctAnswer: "c2",
      wrongAnswers: "d2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "У него часто бывает отрыжка.",
      answers: {
        e2: "Да",
        f2: "Нет",
      },
      correctAnswer: "e2",
      wrongAnswers: "f2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он часто икает",
      answers: {
        g2: "Да",
        h2: "Нет",
      },
      correctAnswer: "g2",
      wrongAnswers: "h2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Ваш малыш испытывает трудности при глотании.",
      answers: {
        i2: "Да",
        j2: "Нет",
      },
      correctAnswer: "i2",
      wrongAnswers: "j2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он с трудом сосёт.",
      answers: {
        k2: "Да",
        l2: "Нет",
      },
      correctAnswer: "k2",
      wrongAnswers: "l2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Когда вы держите малыша на руках, вы слышите, как трудно ему дышать.",
      answers: {
        m2: "Да",
        n2: "Нет",
      },
      correctAnswer: "m2",
      wrongAnswers: "n2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Вы смотрите на ребёнка, наблюдая за всеми его движениями: Он достаточно подвижен и активен для своего возраста.",
      answers: {
        o2: "Да",
        p2: "Нет",
      },
      correctAnswer: "o2",
      wrongAnswers: "p2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он недостаточно бодрый, крепкий и живой.",
      answers: {
        q2: "Да",
        r2: "Нет",
      },
      correctAnswer: "q2",
      wrongAnswers: "r2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он кажется вам беспокойным и сверхвозбудимым.",
      answers: {
        s2: "Да",
        t2: "Нет",
      },
      correctAnswer: "s2",
      wrongAnswers: "t2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Днём ваш малыш слишком часто засыпает и долго спит, несмотря на то, что он",
      answers: {
        u2: "Да",
        v2: "Нет",
      },
      correctAnswer: "u2",
      wrongAnswers: "v2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он путает день с ночью. Днём спит, а ночью бодрствует.",
      answers: {
        w2: "Да",
        x2: "Нет",
      },
      correctAnswer: "w2",
      wrongAnswers: "x2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Его нужно всё время укачивать и уговаривать, чтобы он заснул.",
      answers: {
        y2: "Да",
        z2: "Нет",
      },
      correctAnswer: "y2",
      wrongAnswers: "z2"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он засыпает с трудом.",
      answers: {
        a3: "Да",
        b3: "Нет",
      },
      correctAnswer: "a3",
      wrongAnswers: "b3"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он всё время плачет, перед тем как заснуть, и когда просыпается.",
      answers: {
        c3: "Да",
        d3: "Нет",
      },
      correctAnswer: "c3",
      wrongAnswers: "d3"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он систематически будит вас ночью своим беспричинным плачем.",
      answers: {
        e3: "Да",
        f3: "Нет",
      },
      correctAnswer: "e3",
      wrongAnswers: "f3"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Он часто страдает от бессонницы.",
      answers: {
        g3: "Да",
        h3: "Нет",
      },
      correctAnswer: "g3",
      wrongAnswers: "h3"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Вы наблюдаете за вашим ребёнком и обнаруживаете, что при плаче слезы у него текут из обоих глаз.",
      answers: {
        i3: "Да",
        j3: "Нет",
      },
      correctAnswer: "i3",
      wrongAnswers: "j3"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Слезы текут только из одного глаза.",
      answers: {
        k3: "Да",
        l3: "Нет",
      },
      correctAnswer: "k3",
      wrongAnswers: "l3"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "У него есть шишка на голове, на волосистой части кожи головы (серозно-кровяная шишка).",
      answers: {
        m3: "Да",
        n3: "Нет",
      },
      correctAnswer: "m3",
      wrongAnswers: "n3"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "У него несимметричное лицо или голова.",
      answers: {
        o3: "Да",
        p3: "Нет",
      },
      correctAnswer: "o3",
      wrongAnswers: "p3"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Его голова более плоская с одной стороны.",
      answers: {
        q3: "Да",
        r3: "Нет",
      },
      correctAnswer: "q3",
      wrongAnswers: "r3"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "Когда вы кладёте вашего ребёнка на стол для пеленания, его позвоночник кажется вам прямым и малоподвижным.",
      answers: {
        s3: "Да",
        t3: "Нет",
      },
      correctAnswer: "s3",
      wrongAnswers: "t3"
    },
    {
      heading: "АНКЕТА 2.",
      subHeading: "Для грудного ребёнка.",
      question: "В тот момент, когда ребёнок полностью расслаблен и не плачет, вы кладёте ему руку на животик и обнаруживаете, что живот чрезмерно напряжён.",
      answers: {
        u3: "Да",
        v3: "Нет",
      },
      correctAnswer: "u3",
      wrongAnswers: "v3"
    },
    {
      heading: `АНКЕТА 3. \n Для ребёнка младшего возраста. (от 24 или 30 месяцев до 5 лет). \n Перед тем как ответить на вопросы этой анкеты, ответьте на вопросы предыдущей анкеты, даже если ваш ребёнок вырос. Постарайтесь восстановить по памяти его поведение. \n В тот момент, когда ребёнок полностью расслаблен и не плачет, вы кладёте ему руку на животик и обнаруживаете, что живот чрезмерно напряжён. \n Даже если ваш ребёнок вышел из грудного возраста, вы сможете найти некоторые сигналы тревоги, оставшиеся ранее не замеченными. На Анкету 2 следует ответить, чтобы лучше понимать вопросы Анкеты 3`,
      subHeading: "",
      question: "",
      // answers: {
      //   w3: "Да",
      //   x3: "Нет",
      // },
      // correctAnswer: "w3"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Ваш ребёнок уже часто болеет отитом.",
      answers: {
        w3: "Да",
        x3: "Нет",
      },
      correctAnswer: "w3",
      wrongAnswers: "x3"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Ваш ребёнок уже часто болеет отитом.",
      answers: {
        y3: "Да",
        z3: "Нет",
      },
      correctAnswer: "y3",
      wrongAnswers: "z3"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Отиты плохо поддаются лечению и имеют рецидивы.",
      answers: {
        a4: "Да",
        b4: "Нет",
      },
      correctAnswer: "a4",
      wrongAnswers: "b4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "У вашего ребёнка наблюдается ухудшение слуха.",
      answers: {
        c4: "Да",
        d4: "Нет",
      },
      correctAnswer: "c4",
      wrongAnswers: "d4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Ему прописывают дренаж.",
      answers: {
        e4: "Да",
        f4: "Нет",
      },
      correctAnswer: "e4",
      wrongAnswers: "f4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Ваш ребёнок круглый год ходит с насморком.",
      answers: {
        g4: "Да",
        h4: "Нет",
      },
      correctAnswer: "g4",
      wrongAnswers: "h4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Эти насморки рецидивируют, несмотря на разное медицинское лечение.",
      answers: {
        i4: "Да",
        j4: "Нет",
      },
      correctAnswer: "i4",
      wrongAnswers: "j4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "После удаления полипов он подвержен простудам.",
      answers: {
        k4: "Да",
        l4: "Нет",
      },
      correctAnswer: "k4",
      wrongAnswers: "l4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Он всё время болеет ринофарингитами, несмотря на различное медицинское лечение.",
      answers: {
        m4: "Да",
        n4: "Нет",
      },
      correctAnswer: "m4",
      wrongAnswers: "n4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Он всё время дышит ртом.",
      answers: {
        o4: "Да",
        p4: "Нет",
      },
      correctAnswer: "o4",
      wrongAnswers: "p4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Падал ли Ваш ребенок? Не падал ли он со стола для пеленания.",
      answers: {
        q4: "Да",
        r4: "Нет",
      },
      correctAnswer: "q4",
      wrongAnswers: "r4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Ваш ребёнок часто падает.",
      answers: {
        s4: "Да",
        t4: "Нет",
      },
      correctAnswer: "s4",
      wrongAnswers: "t4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Когда он падает, каждый раз ударяется головой.",
      answers: {
        u4: "Да",
        v4: "Нет",
      },
      correctAnswer: "u4",
      wrongAnswers: "v4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Он резко падал на ягодицы, но без видимых последствий.",
      answers: {
        w4: "Да",
        x4: "Нет",
      },
      correctAnswer: "w4",
      wrongAnswers: "x4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Он упал ничком и ушиб лицо, его ударили по лицу, он получил удар в подбородок, сзади по голове, но без видимых нарушений и последствий (рентгеновский снимок в норме).",
      answers: {
        y4: "Да",
        z4: "Нет",
      },
      correctAnswer: "y4",
      wrongAnswers: "z4"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Он падал навзничь.",
      answers: {
        a5: "Да",
        b5: "Нет",
      },
      correctAnswer: "a5",
      wrongAnswers: "b5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "От удара у него вдруг перехватило дыхание.",
      answers: {
        c5: "Да",
        d5: "Нет",
      },
      correctAnswer: "c5",
      wrongAnswers: "d5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Он был в машине во время столкновения, и хотя машина получила сильный удар, он не пострадал и не имел видимых последствий.",
      answers: {
        e5: "Да",
        f5: "Нет",
      },
      correctAnswer: "e5",
      wrongAnswers: "f5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Он уже имеет истинный сколиоз, хотя едва умеет ходить. Это подтверждается ренгенограммой.",
      answers: {
        g5: "Да",
        h5: "Нет",
      },
      correctAnswer: "g5",
      wrongAnswers: "h5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Он косит одним глазом",
      answers: {
        i5: "Да",
        j5: "Нет",
      },
      correctAnswer: "i5",
      wrongAnswers: "j5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Он косит на оба глаза.",
      answers: {
        k5: "Да",
        l5: "Нет",
      },
      correctAnswer: "k5",
      wrongAnswers: "l5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Его глаза расположены асимметрично.",
      answers: {
        m5: "Да",
        n5: "Нет",
      },
      correctAnswer: "m5",
      wrongAnswers: "n5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "У него уже есть проблемы со зрением.",
      answers: {
        o5: "Да",
        p5: "Нет",
      },
      correctAnswer: "o5",
      wrongAnswers: "p5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Ему нужно носить очки или линзы.",
      answers: {
        q5: "Да",
        r5: "Нет",
      },
      correctAnswer: "q5",
      wrongAnswers: "r5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Мой ребёнок близорукий",
      answers: {
        s5: "Да",
        t5: "Нет",
      },
      correctAnswer: "s5",
      wrongAnswers: "t5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Мой ребёнок дальнозоркий.",
      answers: {
        u5: "Да",
        v5: "Нет",
      },
      correctAnswer: "u5",
      wrongAnswers: "v5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Мой ребёнок страдает астигматизмом.",
      answers: {
        w5: "Да",
        x5: "Нет",
      },
      correctAnswer: "w5",
      wrongAnswers: "x5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
      answers: {
        y5: "Да",
        z5: "Нет",
      },
      correctAnswer: "y5",
      wrongAnswers: "z5"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "У него постоянно открыт рот, а зубы сомкнуты.",
      answers: {
        a6: "Да",
        b6: "Нет",
      },
      correctAnswer: "a6",
      wrongAnswers: "b6"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "У него плохой зубной прикус и плохой зубной контакт.",
      answers: {
        c6: "Да",
        d6: "Нет",
      },
      correctAnswer: "c6",
      wrongAnswers: "d6"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Есть щербины или пустое пространство между передними зубами.",
      answers: {
        e6: "Да",
        f6: "Нет",
      },
      correctAnswer: "e6",
      wrongAnswers: "f6"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "В норме между передними резцами не должно быть пустого пространства. Ваш ребёнок постоянно сосёт один или два пальца, свою пустышку или ещё что-нибудь.",
      answers: {
        g6: "Да",
        h6: "Нет",
      },
      correctAnswer: "g6",
      wrongAnswers: "h6"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Его язык легко проходит в щель между передними зубами.",
      answers: {
        i6: "Да",
        j6: "Нет",
      },
      correctAnswer: "i6",
      wrongAnswers: "j6"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
      answers: {
        k6: "Да",
        l6: "Нет",
      },
      correctAnswer: "k6",
      wrongAnswers: "l6"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Попросите малыша открыть рот и осмотрите ротовую полость. Осмотрите его верхнее нёбо и горло, освещая их карманным фонариком. Он имеет высокое, очень вогнутое нёбо.",
      answers: {
        m6: "Да",
        n6: "Нет",
      },
      correctAnswer: "m6",
      wrongAnswers: "n6"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Это происходит, если ребёнок постоянно сосёт палец или пустышку. Нёбо поднимается. На нём «отпечатывается» след пальца или пустышки. Нёбо деформируется, деформируются зубы и передняя часть верхней челюсти. Мама своим пальцем может оценить глубину нёба своего малыша.На глаз нёбо ребёнка узкое.",
      // answers: {
      //   o6: "Да",
      //   p6: "Нет",
      // },
      // correctAnswer: "o6",
      // wrongAnswers: "p6"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "На глаз нёбо ребёнка широкое.",
      answers: {
        q6: "Да",
        r6: "Нет",
      },
      correctAnswer: "q6",
      wrongAnswers: "r6"
    },
    {
      heading: "АНКЕТА 3.",
      subHeading: `Для ребёнка младшего возраста. 
      (от 24 или 30 месяцев до 5 лет).`,
      question: "Чаще всего высокое (глубокое) нёбо бывает узким. Плоское нёбо бывает широким.",
      answers: {
        s6: "Да",
        t6: "Нет",
      },
      correctAnswer: "s6",
      wrongAnswers: "t6"
    }
    // {
    //   heading: "Для ребёнка младшего возраста. (от 24 или 30 месяцев до 5 лет).",
    //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
    //   answers: {
    //     u6: "Да",
    //     v6: "Нет",
    //   },
    //   correctAnswer: "u6",
    //   wrongAnswers: "v6"
    // },
    // {
    //   heading: "Для ребёнка младшего возраста. (от 24 или 30 месяцев до 5 лет).",
    //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
    //   answers: {
    //     w6: "Да",
    //     x6: "Нет",
    //   },
    //   correctAnswer: "w6",
    //   wrongAnswers: "x6"
    // },
    // {
    //   heading: "Для ребёнка младшего возраста. (от 24 или 30 месяцев до 5 лет).",
    //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
    //   answers: {
    //     y6: "Да",
    //     z6: "Нет",
    //   },
    //   correctAnswer: "y6",
    //   wrongAnswers: "z6"
    // },
    // {
    //   heading: "Для ребёнка младшего возраста. (от 24 или 30 месяцев до 5 лет).",
    //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
    //   answers: {
    //     y5: "Да",
    //     z5: "Нет",
    //   },
    //   correctAnswer: "y5"
    // },
    // {
    //   heading: "Для ребёнка младшего возраста. (от 24 или 30 месяцев до 5 лет).",
    //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
    //   answers: {
    //     y5: "Да",
    //     z5: "Нет",
    //   },
    //   correctAnswer: "y5"
    // },
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();

if(document.querySelector("#kgz")){
  (function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
            console.log(letter)
            // ...add an HTML radio button
            answers.push(
              `<form>
                <input type="checkbox" id="test-${letter}" name="question${questionNumber}" value="${letter}" style="background: #333">
                <label for="test-${letter}">
                  ${currentQuestion.answers[letter]}
                </label>
              </form>
              `
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="quiz-heading" style={margin-bottom: 10px;}>${currentQuestion.heading}</div>
              <pre class="quiz-sub-heading">${currentQuestion.subHeading}</pre>
              <div class="question"> ${currentQuestion.question}</div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = -1;
      let wAnswers = 0
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          // answerContainers[questionNumber].style.color = 'lightgreen';
        } else if(userAnswer === currentQuestion.wrongAnswers){
          wAnswers++
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          // answerContainers[questionNumber].style.color = 'red';
        }
      });
  

      if(numCorrect + wAnswers >= 21) {
        resultsContainer.innerHTML = `
        <div>
        Ооба (бардыгы): ${numCorrect}
        Жок (бардыгы): ${wAnswers}
        «ООБА» деген жооп канчалык көп болсо, балага остеопатикалык жардам ошончолук зарыл.
        Бүтүм.
        Бул суроолордун бардыгы сизди жана үй-бүлөңүздү кызыктырышы керек. Бул объективдүү көрсөткүчтөр балаңыздын эртерек остеопатикалык краниалдуу текшерүүдөн өтүүсү зарыл экендигин билдирген тынсыздануунун белгиси болуп саналат.
        Бул тынчсыздануулар балаңыздын абалындагы айрым билинбеген ооруларга, бир аз алсыздануу, тең салмактуулуктун бузулушу же дисфункциянын пайда болушунан улам болушу ыктымал. Бул абалдын кесепеттери болуп иммунитеттин азайышы, ооруга болгон алдын ала калыптануу, органдардын ооруну тез кабыл алуусу болушу мүмкүн.
        Остеопаттардын эсептөөсүндө, ден-соолукка остеопатикалык жардам керек экендигине ишенген дарылоочу дарыгер бул тынчсыздандыруучу белгилерге кылдат кароосу керек. Алар өз учурунда тиешелүү чараларды көрүүгө, анын ичинде остеопатиялык жардам керек болушу мүмкүн экендигине ишенимдүү болуусу керек.
        Мында терапевтикалык толуктоо же медицинанын жана остеопатиянын өз ара толукталуусу пайда болот. Ар кандай даражадагы оорулар болгондо бардык күмөн саноолорду четке кагуу үчүн абдан кылдаттык менен текшерүү зарыл.</div>
        `
      }

      // show number of correct answers out of total
      numCorrect + wAnswers >= 1 && numCorrect + wAnswers <= 8 ? resultsContainer.innerHTML = `
      <div>Корутунду.
      <p>ООБА (бардык жооп): ${numCorrect}</p>
      <p>ЖОК (бардык жооп): ${wAnswers}</p>
      Эгерде сиз төрөт боюнча берилген суроолордун жок дегенде бирөөсүнө ООБА деп жооп берсеңиз, анда балаңыздын баш сөөгү кандайдыр бир стресске дуушар болгон.
      Түйүлдүктүн жеңил же кыйынчылык менен ичтен чыгаруусун камсыздай турган жатуунун түрүнө жараша, өз алдынча же акушердин жардамы менен төрөөдө, жаңы төрөлгөн ымыркайдын баш сөөгү аздыр-көптүр катуу стресстерге дуушар болот. Дагы кайталап айткыбыз келет, ар бир төрөт өзгөчө жана өзүнчө түргө ээ. Жеке учурларды жалпы жана универсалдуу мыйзам даражасына көтөрүүгө мүмкүн эмес! Остеопатка төрөттөн кийин, мүмкүнчүлүк болгондо эле дароо баруу керек.</div>
      `: resultsContainer.innerHTML = `<div>
      <p>ООБА (бардыгы): ${numCorrect}</p>
      <p>ЖОК (бардыгы): ${wAnswers}</p>
      ООБА деген жооп канчалык көп болсо, остеопатка баруу зарылдыгы ошончолук жогору.</div>`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      // if(currentSlide > firstBlockQues){
      //   submitButton.style.display = "inline-block"
      // }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        // submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'inline-block';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        heading: "АНКЕТА 1.",
        subHeading: "Төрөттөр.",
        question: "1. Сиздин төрөтүңүз оор, узак мөөнөттүү, кыска мөөнөттүү же убагынан эрте болгонбу.",
        answers: {
          a: "Ооба",
          b: "Жок",
        },
        correctAnswer: "a",
        wrongAnswers: "b"
      },
      {
        heading: "АНКЕТА 1.",
        subHeading: "Төрөттөр.",
        question: "2. Төрөтүңүз козголгон, тездетилген же кечиктирилгенби.",
        answers: {
          c: "Ооба",
          d: "Жок",
        },
        correctAnswer: "c",
        wrongAnswers: "d"
      },
      {
        heading: "АНКЕТА 1.",
        subHeading: "Төрөттөр.",
        question: '3. Акушерканы күтүүгө туура келген учур болду беле? Сизден төрөттү жасалма жол менен токтотууну сураныштыбы: "жамбашыңызды кысыңыз", төрөт процессин кармоо, ымыркай ылдыйлап калган учурда төрөт бөлүмүнө өз алдынча барууңуз.',
        answers: {
          e: "Ооба",
          f: "Жок",
        },
        correctAnswer: "e",
        wrongAnswers: "f"
      },
      {
        heading: "АНКЕТА 1.",
        subHeading: "Төрөттөр.",
        question: "4. Жатуу сунушу кандай болду? Жүзүңүздү бери каратыппы?",
        answers: {
          g: "Ооба",
          h: "Жок",
        },
        correctAnswer: "g",
        wrongAnswers: "h"
      },{
        heading: "АНКЕТА 1.",
        subHeading: "Төрөттөр.",
        question: "5. Жатуу сунушу кандай болду? Жамбаш мененби?",
        answers: {
          i: "Ооба",
          j: "Жок",
        },
        correctAnswer: "i",
        wrongAnswers: "j"
      },
      {
        heading: "АНКЕТА 1.",
        subHeading: "Төрөттөр.",
        question: "6. Төрөт учурунда чымчуурлар, калакчалар же сордургуч аппараттар колдонулганбы?",
        answers: {
          k: "Ооба",
          l: "Жок",
        },
        correctAnswer: "k",
        wrongAnswers: "l"
      },
      {
        heading: "АНКЕТА 1.",
        subHeading: "Төрөттөр.",
        question: "7. Сизде кесарча жаруу (ичтен баланы жарып алуу) операциясы болгонбу? Пландалганбы же шашылышпы?",
        answers: {
          m: "Ооба",
          n: "Жок",
        },
        correctAnswer: "m",
        wrongAnswers: "n"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "Эмчектеги ымыркайлар үчүн. \n(Эмчектеги бала – бул 10 күндүктөн 24 айга чейинки балдар, айрым дарыгерлер 30 айга чейинкилер деп эсептешет).",
        question: "1. Ымыркайыңызды көтөргөндө, ороп жатканда, жалаякты алмаштырганда же ага керектүү башка аракеттерди аткарууда табы жоктой, көңүлсүз болуп, ыйлайт.",
        answers: {
          o: "Ооба",
          p: "Жок",
        },
        correctAnswer: "o",
        wrongAnswers: "p"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "2. Ал калчылдап титрейт, себепсиз эле бүгүлөт же тырышат.",
        answers: {
          q: "Ооба",
          r: "Жок",
        },
        correctAnswer: "q",
        wrongAnswers: "r"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "3. Колуңузда жатканда же отурганда эч кандай себеби жок эле башын артка чалкалатат.",
        answers: {
          s: "Ооба",
          t: "Жок",
        },
        correctAnswer: "s",
        wrongAnswers: "t"
  
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: `4. Керебетте жатканда ал ар дайым башына жөлөнгүч издейт, мисалы, керебеттин таякчаларына жөлөнүп.`,
        answers: {
          u: "Ооба",
          v: "Жок",
        },
        correctAnswer: "u",
        wrongAnswers: "v"
  
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: `5. Жатканда.
        Ал бир эле капталы менен уктайт.
        `,
        answers: {
          w: "Ооба",
          x: "Жок",
        },
        correctAnswer: "w",
        wrongAnswers: "x"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Башын бир тарапка эле бура берет.",
        answers: {
          y: "Ооба",
          z: "Жок",
        },
        correctAnswer: "y",
        wrongAnswers: "z"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Анын башы дайыма абдан түздөнгөн абалда болот, ал артка карай абдан чалкалайт (мындай учурда анын моюну менен керебеттин ортосунда боштук болот).",
        answers: {
          a1: "Ооба",
          b1: "Жок",
        },
        correctAnswer: "a1",
        wrongAnswers: "b1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "6. Жатканда, баланын башы денеси менен бирдей деңгээлде болгондо, карагыла, анын колдорунун жана буттарынын учтары кандай. Алар асимметриялык абалда болот.",
        answers: {
          c1: "Ооба",
          d1: "Жок",
        },
        correctAnswer: "c1",
        wrongAnswers: "d1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "7. Ал чалкасынан жаткырганда пияз сыяктуу бүгүлөт.",
        answers: {
          e1: "Ооба",
          f1: "Жок",
        },
        correctAnswer: "e1",
        wrongAnswers: "f1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "8. Аны чалкасынан жаткырганда уктабастан, мындай абалды жагымсыз же ыңгайсыз эсептөө менен андан качат.",
        answers: {
          g1: "Ооба",
          h1: "Жок",
        },
        correctAnswer: "g1",
        wrongAnswers: "h1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Кежигесине.",
        answers: {
          i1: "Ооба",
          j1: "Жок",
        },
        correctAnswer: "i1",
        wrongAnswers: "j1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: `9. Баланы жуунтуп жатканда, эгер тийип алсаңыз, ал кыйкырат: 
        Башына.`,
        answers: {
          k1: "Ооба",
          l1: "Жок",
        },
        correctAnswer: "k1",
        wrongAnswers: "l1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Кежигесине.",
        answers: {
          m1: "Ооба",
          n1: "Жок",
        },
        correctAnswer: "m1",
        wrongAnswers: "n1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Денесинин башка бөлүктөрүнө.",
        answers: {
          o1: "Ооба",
          p1: "Жок",
        },
        correctAnswer: "o1",
        wrongAnswers: "p1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "10. Эгерде кежигесинин жогорку бөлүгүнө тийсеңиз ал бат-баттан ыйлайт.",
        answers: {
          q1: "Ооба",
          r1: "Жок",
        },
        correctAnswer: "q1",
        wrongAnswers: "r1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "11. Ал эч белгисиз себептер менен эле чыңырган, кыңылдаган үндөрдү чыгарат.",
        answers: {
          s1: "Ооба",
          t1: "Жок",
        },
        correctAnswer: "s1",
        wrongAnswers: "t1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Ымыркай эч себепсиз эле ар дайым же тез-тезден ыйлайт.",
        answers: {
          u1: "Ооба",
          v1: "Жок",
        },
        correctAnswer: "u1",
        wrongAnswers: "v1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "12. Ымыркайдын шилекейи көп агат, ал шилекей агызганды жакшы көрөт.",
        answers: {
          w1: "Ооба",
          x1: "Жок",
        },
        correctAnswer: "w1",
        wrongAnswers: "x1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: `13. Ымыркайыңыздын эмчек эмүүсү жакшы.`,
        answers: {
          y1: "Ооба",
          z1: "Жок",
        },
        correctAnswer: "y1",
        wrongAnswers: "z1"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Аны мажбурлап эмизүү керек же упчу берүү керек.",
        answers: {
          a2: "Ооба",
          b2: "Жок",
        },
        correctAnswer: "a2",
        wrongAnswers: "b2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: `14. Эмчек эмизгенден кийин же упчу менен тойгузгандан кийин балаңыз: 
        Системалуу түрдө кусат.`,
        answers: {
          c2: "Ооба",
          d2: "Жок",
        },
        correctAnswer: "c2",
        wrongAnswers: "d2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Бат-баттан же системалуу түрдө окшуйт.",
        answers: {
          e2: "Ооба",
          f2: "Жок",
        },
        correctAnswer: "e2",
        wrongAnswers: "f2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Ал бат-баттан кекирет.",
        answers: {
          g2: "Ооба",
          h2: "Жок",
        },
        correctAnswer: "g2",
        wrongAnswers: "h2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Ал бат-баттан ыктытат.",
        answers: {
          i2: "Ооба",
          j2: "Жок",
        },
        correctAnswer: "i2",
        wrongAnswers: "j2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Кусуу – бул тамакты аздыр-көптүр чыгарып таштоо, болгону бир нече куб.см суюктук же сүттү бир учурда же кайталап чыгарып таштоо. Ал нормада болгондо көлөмү көбөйбөшү керек, кофенин үч кашыгы менен барабар. Кусууну окшуу менен айырмалай билиш керек.",
        // answers: {
        //   k2: "Ооба",
        //   l2: "Жок",
        // },
        // correctAnswer: "k2",
        // wrongAnswers: "l2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "15. Ымыркайыңыз тамакты кыйынчылык менен жутат.",
        answers: {
          m2: "Ооба",
          n2: "Жок",
        },
        correctAnswer: "m2",
        wrongAnswers: "n2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Кыйынчылык менен эмчек эмет.",
        answers: {
          o2: "Ооба",
          p2: "Жок",
        },
        correctAnswer: "o2",
        wrongAnswers: "p2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "16. Сиз ымыркайды колго алганда, анын дем алуусу кыйын болуп жаткандыгын угасыз.",
        answers: {
          q2: "Ооба",
          r2: "Жок",
        },
        correctAnswer: "q2",
        wrongAnswers: "r2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: `17. Ымыркайдын ар бир кыймылын байкоо менен карайыз:
        Ал өзүнүн жашына жараша жетишерлик кыймылда болуп жатабы жана активдүүбү.`,
        answers: {
          s2: "Ооба",
          t2: "Жок",
        },
        correctAnswer: "s2",
        wrongAnswers: "t2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Ал сергек эмес, алы жок жана кыймылы жетишерлик эмес.",
        answers: {
          u2: "Ооба",
          v2: "Жок",
        },
        correctAnswer: "u2",
        wrongAnswers: "v2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Ал сизге тынчсызданган жана ашыкча кыжырданган сыяктуу сезилет.",
        answers: {
          w2: "Ооба",
          x2: "Жок",
        },
        correctAnswer: "w2",
        wrongAnswers: "x2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "18. Күндүзү сиздин ымыркай абдан тез-тезден жана көпкө чейин уктайт, түнкүсүн жакшы уктагандыгына карабастан.",
        answers: {
          y2: "Ооба",
          z2: "Жок",
        },
        correctAnswer: "y2",
        wrongAnswers: "z2"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Ал күндү түн менен алмаштырат. Күндүзү уктайт, түнү сергек болот.",
        answers: {
          a3: "Ооба",
          b3: "Жок",
        },
        correctAnswer: "a3",
        wrongAnswers: "b3"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Аны ар дайым терметип жана уктаганга ынандырып туруу керек.",
        answers: {
          c3: "Ооба",
          d3: "Жок",
        },
        correctAnswer: "c3",
        wrongAnswers: "d3"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Ал кыйынчылык менен уктайт.",
        answers: {
          e3: "Ооба",
          f3: "Жок",
        },
        correctAnswer: "e3",
        wrongAnswers: "f3"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Ал ар дайым уктаар алдында жана ойгонгон маалда ыйлайт.",
        answers: {
          g3: "Ооба",
          h3: "Жок",
        },
        correctAnswer: "g3",
        wrongAnswers: "h3"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Ал системалуу түрдө себепсиз ыйлоо менен сизди түнкүсүн ойготот.",
        answers: {
          i3: "Ооба",
          j3: "Жок",
        },
        correctAnswer: "i3",
        wrongAnswers: "j3"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Ал уйкусуздук менен көп кыйналат.",
        answers: {
          k3: "Ооба",
          l3: "Жок",
        },
        correctAnswer: "k3",
        wrongAnswers: "l3"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "19. Сиз балаңыз ыйлап жатканда анын эки көзүнөн тең жаш агып жатканын байкайсыз.",
        answers: {
          m3: "Ооба",
          n3: "Жок",
        },
        correctAnswer: "m3",
        wrongAnswers: "n3"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Жашы бир гана көзүнөн чыгат.",
        answers: {
          o3: "Ооба",
          p3: "Жок",
        },
        correctAnswer: "o3",
        wrongAnswers: "p3"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Анын башында, баш терисинин чачтуу бөлүгүндө шишик бар (сероздуу-канталаган шишик).",
        answers: {
          q3: "Ооба",
          r3: "Жок",
        },
        correctAnswer: "q3",
        wrongAnswers: "r3"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Анын бети же башы кыйшык (ассимметриялуу).",
        answers: {
          s3: "Ооба",
          t3: "Жок",
        },
        correctAnswer: "s3",
        wrongAnswers: "t3"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Анын башынын бир тарабы көбүрөөк жалпак.",
        answers: {
          u3: "Ооба",
          v3: "Жок",
        },
        correctAnswer: "u3",
        wrongAnswers: "v3"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "20. Сиз балаңыздын жалаягын алмаштыруу үчүн столдун үстүнө жаткызганда, анын кыр аркалары түз жана аз кыймылдуу болгондой сезилет.",
        answers: {
          w3: "Ооба",
          x3: "Жок",
        },
        correctAnswer: "w3",
        wrongAnswers: "x3"
      },
      {
        heading: "АНКЕТА 2.",
        subHeading: "",
        question: "Бала толугу менен алсыз жана ыйлабай калган маалда сиз аны курсагы менен колуңузга жаткырасыз жана анын курсагы чыңалып турганын билесиз.",
        // answers: {
        //   y3: "Ооба",
        //   z3: "Жок",
        // },
        correctAnswer: "y3",
        wrongAnswers: "z3"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: `Кенже курактагы балдар үчүн
        (24 же 30 айдан баштап 5 жашка чейин).`,
        question: "1. Балаңыз отит менен көп ооруйт.",
        answers: {
          a4: "Ооба",
          b4: "Жок",
        },
        correctAnswer: "a4",
        wrongAnswers: "b4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Отиттер оңой менен айыкпайт жана кайталанып турат.",
        answers: {
          c4: "Ооба",
          d4: "Жок",
        },
        correctAnswer: "c4",
        wrongAnswers: "d4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Балаңыздын угуусунун начарлагандыгы байкалууда.",
        answers: {
          e4: "Ооба",
          f4: "Жок",
        },
        correctAnswer: "e4",
        wrongAnswers: "f4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Ага кулагын тазалоону дайындашат.",
        answers: {
          g4: "Ооба",
          h4: "Жок",
        },
        correctAnswer: "g4",
        wrongAnswers: "h4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "2. Балаңыз жыл боюу мурду бүткөн абалда жүрөт.",
        answers: {
          i4: "Ооба",
          j4: "Жок",
        },
        correctAnswer: "i4",
        wrongAnswers: "j4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Ар кандай медициналык дарылоолорго карабастан мурдунун бүтүүсү кайталана берет.",
        answers: {
          k4: "Ооба",
          l4: "Жок",
        },
        correctAnswer: "k4",
        wrongAnswers: "l4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Полиптерден (былжыр челдердин өсүндүлөрү) тазалангандан кийин ал суук тийгизип алууга жакын.",
        answers: {
          m4: "Ооба",
          n4: "Жок",
        },
        correctAnswer: "m4",
        wrongAnswers: "n4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Он всё время дышит ртом.",
        answers: {
          o4: "Ооба",
          p4: "Жок",
        },
        correctAnswer: "o4",
        wrongAnswers: "p4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Ар кандай медициналык дарыланууларга карабастан, ал ар дайым ринофарингит менен ооруйт.",
        answers: {
          q4: "Ооба",
          r4: "Жок",
        },
        correctAnswer: "q4",
        wrongAnswers: "r4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Ал ар дайым оозу менен дем алат.",
        answers: {
          s4: "Ооба",
          t4: "Жок",
        },
        correctAnswer: "s4",
        wrongAnswers: "t4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "3. Балаңыз жыгылды беле? Ал жалаяк алмаштыруучу столдон кулаган эмес.",
        answers: {
          u4: "Ооба",
          v4: "Жок",
        },
        correctAnswer: "u4",
        wrongAnswers: "v4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Балаңыз көп жыгылат.",
        answers: {
          w4: "Ооба",
          x4: "Жок",
        },
        correctAnswer: "w4",
        wrongAnswers: "x4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Ал жыгылганда, ар дайым башын уруп алат.",
        answers: {
          y4: "Ооба",
          z4: "Жок",
        },
        correctAnswer: "y4",
        wrongAnswers: "z4"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Ал көтөнү менен катуу отуруп калды, бирок анчалык деле кесепеттери жок.",
        answers: {
          a5: "Ооба",
          b5: "Жок",
        },
        correctAnswer: "a5",
        wrongAnswers: "b5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Ал бети менен жыгылды жана бети көгөрдү, аны бетке чабышты, ал ээгине, башынын аркасына сокку алды, бирок анчалык деле көрүнүктүү бузуулар жана кесепеттери жок (рентген сүрөтү нормалдуу).",
        answers: {
          c5: "Ооба",
          d5: "Жок",
        },
        correctAnswer: "c5",
        wrongAnswers: "d5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Ал курсагы менен кулады.",
        answers: {
          e5: "Ооба",
          f5: "Жок",
        },
        correctAnswer: "e5",
        wrongAnswers: "f5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Соккудан улам анын деми кыстыгып калды.",
        answers: {
          g5: "Ооба",
          h5: "Жок",
        },
        correctAnswer: "g5",
        wrongAnswers: "h5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Кагылышкан учурда ал машинада болчу, машина катуу сокку алганы менен ал жабыр тарткан жок жана көрүнүктүү кесепеттери болгон жок.",
        answers: {
          i5: "Ооба",
          j5: "Жок",
        },
        correctAnswer: "i5",
        wrongAnswers: "j5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "4. Ал араң басып жүрсө дагы, сколиоз экени чындык. Бул рентгенограммада тастыкталат.",
        answers: {
          k5: "Ооба",
          l5: "Жок",
        },
        correctAnswer: "k5",
        wrongAnswers: "l5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "5. Анын бир көзү кыйшык.",
        answers: {
          m5: "Ооба",
          n5: "Жок",
        },
        correctAnswer: "m5",
        wrongAnswers: "n5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Анын эки көзү тең кыйшык.",
        answers: {
          o5: "Ооба",
          p5: "Жок",
        },
        correctAnswer: "o5",
        wrongAnswers: "p5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "6. Анын көздөрү ассиметриялуу түрдө жайгашкан.",
        answers: {
          q5: "Ооба",
          r5: "Жок",
        },
        correctAnswer: "q5",
        wrongAnswers: "r5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "7. Анын көзүндө олуттуу көйгөйлөрү бар.",
        answers: {
          s5: "Ооба",
          t5: "Жок",
        },
        correctAnswer: "s5",
        wrongAnswers: "t5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Ал көз айнек же линза тагынышы керек.",
        answers: {
          u5: "Ооба",
          v5: "Жок",
        },
        correctAnswer: "u5",
        wrongAnswers: "v5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Менин балам алысты көрбөйт.",
        answers: {
          w5: "Ооба",
          x5: "Жок",
        },
        correctAnswer: "w5",
        wrongAnswers: "x5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Менин балам алысты жакшы көрөт.",
        answers: {
          y5: "Ооба",
          z5: "Жок",
        },
        correctAnswer: "y5",
        wrongAnswers: "z5"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Менин балам астигматизм менен жабыркайт.",
        answers: {
          a6: "Ооба",
          b6: "Жок",
        },
        correctAnswer: "a6",
        wrongAnswers: "b6"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "8. Анын жаагынын ылдыйкы бөлүгү абдан эле алдыга чыгып турат же артка кирип турат.",
        answers: {
          c6: "Ооба",
          d6: "Жок",
        },
        correctAnswer: "c6",
        wrongAnswers: "d6"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Анын жаагынын жогорку бөлүгү алдыга абдан эле чыгып турат же артка кирип турат.",
        answers: {
          e6: "Ооба",
          f6: "Жок",
        },
        correctAnswer: "e6",
        wrongAnswers: "f6"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "9. Анын оозу ар дайым ачык болуп, тиштенип алат.",
        answers: {
          g6: "Ооба",
          h6: "Жок",
        },
        correctAnswer: "g6",
        wrongAnswers: "h6"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Ал жакшы тиштей албайт, тиштери бири-бирине тийбейт.",
        answers: {
          i6: "Ооба",
          j6: "Жок",
        },
        correctAnswer: "i6",
        wrongAnswers: "j6"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Алдыңкы тиштердин ортосунда жаракалар бар же бош орун бар.",
        answers: {
          k6: "Ооба",
          l6: "Жок",
        },
        correctAnswer: "k6",
        wrongAnswers: "l6"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Нормада алдыңкы азуу тиштердин ортосунда бош орун болбошу керек. Балаңыз ар дайым бир же эки манжасын, өзүнүн упчусун же башка нерсени соро берет.",
        answers: {
          m6: "Ооба",
          n6: "Жок",
        },
        correctAnswer: "m6",
        wrongAnswers: "n6"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Анын тили алдыңкы тиштердин ортосундагы жаракадан оңой өтөт.",
        answers: {
          o6: "Ооба",
          p6: "Жок",
        },
        correctAnswer: "o6",
        wrongAnswers: "p6"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "10. Балаңыздан оозун ачуусун сураныңыз жана ооз көңдөйүн караңыз. Анын жогорку татаңдайын жана тамагын чөнтөк фонарын жандырып алып караңыз. Анын таңдайы бийик жана оюулган болот.",
        answers: {
          q6: "Ооба",
          r6: "Жок",
        },
        correctAnswer: "q6",
        wrongAnswers: "r6"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Көз болжол менен караганда таңдай кууш болот.",
        answers: {
          s6: "Ооба",
          t6: "Жок",
        },
        correctAnswer: "s6",
        wrongAnswers: "t6"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "Көз болжол менен баланын таңдайы кеңейген. \nКөбүнчө жогорку (терең) таңдайлар кууш болот. Жалпак таңдайлар кең болот.",
        answers: {
          u6: "Да",
          v6: "Нет",
        },
        correctAnswer: "u6",
        wrongAnswers: "v6"
      },
      {
        heading: "АНКЕТА 3.",
        subHeading: "",
        question: "11. Сиздин балаңыз брекет кийет.",
        answers: {
          w6: "Да",
          x6: "Нет",
        },
        correctAnswer: "w6",
        wrongAnswers: "x6"
      },
      // {
      //   heading: "АНКЕТА 3.",
      //   subHeading: "",
      //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
      //   answers: {
      //     y6: "Да",
      //     z6: "Нет",
      //   },
      //   correctAnswer: "y6",
      //   wrongAnswers: "z6"
      // },
      // {
      //   heading: "АНКЕТА 3.",
      //   subHeading: "",
      //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
      //   answers: {
      //     y5: "Да",
      //     z5: "Нет",
      //   },
      //   correctAnswer: "y5"
      // },
      // {
      //   heading: "АНКЕТА 3.",
      //   subHeading: "",
      //   question: "Передняя часть его нижней челюсти слишком выдаётся вперёд или отодвинута назад",
      //   answers: {
      //     y5: "Да",
      //     z5: "Нет",
      //   },
      //   correctAnswer: "y5"
      // },
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();
  
}