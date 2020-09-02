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
      question: "In what city can the entire world's population fit inside",
      answers: [
        'New York',
        'Los Angeles',
        'Chicago',
        'Dallas'
      ],
      correctAnswer: 'Los Angeles'
    },
    {
      questionNumber: 4,
      question: "Which letter does not appear in any U.S. state's name?",
      answers: [
        'X',
        'Z',
        'Q',
        'W'
      ],
      correctAnswer: 'Q'
    },
    {
      questionNumber: 5,
      question: "How many letters does the longest English word have?",
      answers: [ 
        '6,471,389',
        '189,819',
        '100',
        '820'
      ],
      correctAnswer: '189,819'
    }
  ],
  totalNumberofQuestions: 5,
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  congratulationsMessage: ""
};

// input: question object to get question data from
// output: html element
function generateQuizQuestionsString(questionObject) {
  return `
  <div id="js-quiz-element" class="section">
      <article id="home">
        <div class="group">
          <div id="quiz-container" quiz-index="${STORE.questionNumber}">
            <p class="question-number">Question: ${questionObject.questionNumber} of ${STORE.totalNumberofQuestions}</p>
            <p id="score-board">Score: ${STORE.score}</p>
            <p>${questionObject.question}</p>
            <fieldset id="radio-form">
              <legend class="js-answer-choice">Please Choose One</legend>
              <label class="radio">
                <input id="answers" name="selection" value="${questionObject.answers[0]}" type="radio"> ${questionObject.answers[0]}
              </label>
              <br>
              <legend class="js-answer-choice"></legend>
              <label class="radio">
                <input id="answers" name="selection" value="${questionObject.answers[1]}" type="radio"> ${questionObject.answers[1]}
              </label>
              <br>
              <legend class="js-answer-choice"></legend>
              <label class="radio">
                <input id="answers" name="selection" value="${questionObject.answers[2]}" type="radio"> ${questionObject.answers[2]}
              </label>
              <br>
              <legend class="js-answer-choice"></legend>
              <label class="radio">
                <input id="answers" name="selection" value="${questionObject.answers[3]}" type="radio"> ${questionObject.answers[3]}
              </label>
            </fieldset>
            <input id="submit-answer-button" type="submit" value="Submit"></input>
          </div>
        </div>
      </article>
    </div>`
}

//generate congratulations string
//output: html that congratulates the user
function generateCongratsString() {
  return `
  <main>
    <div class="section">
      <article id="home">
        <div class="group">
          <div class="item congrats-item">
            <p>You finished with a score of: ${STORE.score}</p>
            <p>You get a: ${determineGradeAndMessage(STORE.score)}</p>
            <p>${STORE.congratulationsMessage}</p>
          </div>
        </div>
      </article>
    </div>
  </main>`
}

function determineGradeAndMessage(score) {
  // Set the student's grade
  switch (score) {
    case score = 5:
      STORE.congratulationsMessage = "Awesome";
      return("A");
    case score = 4:
      STORE.congratulationsMessage = "Berry Good";
      return("B");
    case score = 3:
      STORE.congratulationsMessage = "Can Improve";
      return("C");
    case score = 2:
      STORE.congratulationsMessage = "Did not study";
      return("D");
    default:
      STORE.congratulationsMessage = "FAIL!";
      return("F");
  }
}

//--Responsible for rendering the quiz to the DOM
function renderQuizApp() {
  console.log('`renderQuizApp` is working')
  $('h1').text('World Facts Quiz');
  let questionObject = STORE.questions[STORE.questionNumber];
  let questionHtml = generateQuizQuestionsString
  (questionObject);
  $('main').append(questionHtml);
  $('main').prepend(`<div class="alert">
    <strong id="correct-flash" class="hidden alert">Correct!</strong>
    <strong id="incorrect-flash" class="hidden alert">Incorrec!</strong>
  </div>`)
}

//--Alert Messages
function displayCorrectAlertMessage() {
  $('#correct-flash').toggle();
  setTimeout(
    function () {
      $('#correct-flash').fadeOut('slow');
    }, 2000);
}

function displayIncorrectAlertMessage() {
  $('#incorrect-flash').toggle();
  setTimeout(
    function () {
      $('#incorrect-flash').fadeOut('slow');
    }, 2000);
}
//--Responsible for handling submit button click event
function handleSubmitBtn() {
  console.log('`handleSubmitBtn` is working');
  $('main').on('click', '#submit-answer-button', function (e) {
    event.preventDefault();
    let quizIndex = STORE.questionNumber;
    let quizAnswer = STORE.questions[quizIndex].correctAnswer;
    let selectedAnswer = $('input[name="selection"]:checked').val();
    if (selectedAnswer == quizAnswer) {
      displayCorrectAlertMessage();
      STORE.score ++;
      STORE.questionNumber ++; 
      replaceQuestion();
    } else {
      displayIncorrectAlertMessage();
      STORE.questionNumber ++;
      replaceQuestion();
    }
  })
}

//--Responsible for replacing with next question
function replaceQuestion() {
  //checking if the current question is the last question
  if (isCurrentQuestionTheLast()) {
    //if it is the last question then alert 
    let congratulationsHtml = generateCongratsString();
    $('#js-quiz-element').replaceWith(congratulationsHtml);
    //if it's not the last question then replace the question
  } else {
    let questionObject = STORE.questions[STORE.questionNumber];
    let newQuizQuestion = generateQuizQuestionsString(questionObject);
    $('#js-quiz-element').replaceWith(newQuizQuestion);
  }
  
}
//output: boolean true or false whether return question is the last;
function isCurrentQuestionTheLast() {
  let totalNumberofQuestions = STORE.totalNumberofQuestions;
  let currentQuestionNumber = STORE.questionNumber;
  return totalNumberofQuestions == currentQuestionNumber;
}


//--Render Function
function handleFilmQuizApp() {
  renderQuizApp();
  handleSubmitBtn();
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