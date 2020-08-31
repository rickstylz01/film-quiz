"use strict";
/**
 * Example store structure
 */
const STORE = {
  questions: [
    { 
      questionNumber: 1,
      question: 'According to geographical nomenclature, how many continents are there in the world?',
      answers: [
        '8',
        '10',
        '6',
        '7'
      ],
      correctAnswer: '7'
    },
    {
      questionNumber: 2,
      question: "Who was the actor that played King T'challa in the film Black Panther?",
      answers: [
        'Chadwick Boseman',
        'Michael B. Jordan',
        'Danai Gurira',
        'Mahershala Ali'
      ],
      correctAnswer: 'Chadwick Boseman'
    },
    {
      questionNumber: 3,
      question: "True or False: The entire world's population could fit inside Los Angeles",
      answers: [
        'true',
        'false',
      ],
      correctAnswer: 'true'
    },
    {
      questionNumber: 4,
      question: "Which letter does not appear in any U.S. state's name?",
      answers: [
        'Q',
        'Z',
        'X',
        'W'
      ],
      correctAnswer: 'Q'
    },
    {
      questionNumber: 5,
      question: "How many letters does the longest English word have?",
      answers: [
        '189,819',
        '6,471,389',
        '100',
        '820'
      ],
      correctAnswer: '189,819'
    }
  ],
  totalNumberofQuestions: 5,
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

function generateQuizQuestionsString(quiz) {
  return `
  <div class="section">
      <article id="home">
        <div class="group">
          <div id="quiz-container" quiz-index="${STORE.questions.indexOf(quiz)}">
            <h2>Question: "${quiz.questionNumber}" of "${STORE.totalNumberofQuestions}"</h2>
            <p>Score: "${STORE.score}</p>
            <p>"${quiz.question}"</p>
            <form>
              <input type="radio" class="js-answer-choice" id="answerOne" name="selection" value="${quiz.answers[0]}">
              <label for="answerOne">"${quiz.answers[0]}"</label>
              <br>
              <input type="radio" class="js-answer-choice" id="answerTwo" name="selection" value="${quiz.answers[1]}">
              <label for="answerTwo">"${quiz.answers[1]}"</label><br>
              <input type="radio" class="js-answer-choice" id="answerThree" name="selection" value="${quiz.answers[2]}">
              <label for="answerThree">"${quiz.answers[2]}"</label><br>
              <input type="radio" class="js-answer-choice" id="answerFour" name="selection" value="${quiz.answers[3]}">
              <label for="answerFour">"${quiz.answers[3]}"</label><br>
            </form>
            <input class="submit-button js-submit-button" type="submit" value="Submit">
          </div>
        </div>
      </article>
    </div>`
}


//--Responsible for rendering the quiz to the DOM
function renderQuizApp() {
  console.log('`renderQuizApp` is working')
  $('body').append(generateQuizQuestionsString(STORE.questions[0]));
}
//--Responsible for handling submit button click event
function handleSubmitBtn() {
  console.log('`handleSubmitBtn` is working');
  $('.js-submit-button').on('click', function (e) {
    event.preventDefault();
    let quizIndex = STORE.questionNumber;
    let quizAnswer = STORE.questions[quizIndex].correctAnswer;
    let selectedAnswer = $('input[name="selection"]:checked').val();
    if (quizAnswer == selectedAnswer) {
      alert("correct!");
      STORE.score ++;
    } else {
      alert("wrong");
    }
    
    renderQuizApp();
  })
}

function handleNextBtn() {
  console.log('`handleNextBtn` is working');
  //this function will handle the "next button" event click
}

//--Render Function
function handleFilmQuizApp() {
  renderQuizApp();
  handleSubmitBtn();
  handleNextBtn();
}

$(handleFilmQuizApp);




/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)


