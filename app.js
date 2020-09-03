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
          <form id="quiz-container" quiz-index="${STORE.questionNumber}">
            <h2 class="question-number">Question: ${questionObject.questionNumber} of ${STORE.totalNumberofQuestions}</h2>
            <h3 id="score-board">Score: ${STORE.score}</h3>
            <p>${questionObject.question}</p>
            <fieldset id="radio-form">
            <legend class="js-answer-choice">Please Choose One</legend><br>
              <div class="answer"> 
                <label class="radio">
                <input class="radio-input" name="selection" value="${questionObject.answers[0]}" type="radio"> ${questionObject.answers[0]}
                </label>
              </div><br>
              <div class="answer">
                <label class="radio">
                <input class="radio-input" name="selection" value="${questionObject.answers[1]}" type="radio"> ${questionObject.answers[1]}
                </label>
              </div><br>
              <div class="answer">
                <label class="radio">
                <input class="radio-input" name="selection" value="${questionObject.answers[2]}" type="radio"> ${questionObject.answers[2]}
                </label>
              </div><br>
              <div class="answer">
                <label class="radio">
                <input class="radio-input" name="selection" value="${questionObject.answers[3]}" type="radio"> ${questionObject.answers[3]}
                </label>
              </div><br>
            </fieldset>
            <input id="submit-answer-button" type="submit" value="Submit"></input>
          </form>
        </div>
      </article>
    </div>`
}

//generate congratulations string
//output: html that congratulates the user
function generateCongratsString() {
  return `
    <div id="congrats-element" class="section">
      <article id="home">
        <div class="group">
          <div class="item congrats-item">
            <p>You finished with a score of: ${STORE.score}</p>
            <p>Your grade is: ${determineGradeAndMessage()}</p>
            <p>${STORE.congratulationsMessage}</p>
            <input id="play-again-button" type="submit" value="Play Again"></input>
          </div>
        </div>
      </article>
    </div>`
}

//genereate starting page element
//output: html element that lets player start the game
function generateStartingPageString() {
  return `
    <div id="start-element" class="section">
      <article id="home">
        <div class="group">
          <div class="item start-item">
            <p>Test your knowledge on world facts</p>
            <p>Press start to begin</p>
            <input id="start-button" type="submit" value="START"></input>
          </div>
        </div>
      </article>
    </div>`
}

function determineGradeAndMessage() {
  // Set the student's grade
  if (STORE.score == 5){ 
    STORE.congratulationsMessage = "Awesome!";
    return("A");
  } else if (STORE.score == 4) {
    STORE.congratulationsMessage = "Berry Good";
    return("B");
  } else if (STORE.score == 3) {
    STORE.congratulationsMessage = "Can Improve";
    return("C");
  } else if (STORE.score == 2) {
    STORE.congratulationsMessage = "Did not study";
    return("D");
  } else {
    STORE.congratulationsMessage = "FAIL!";
    return("F");
  }
}

//--displays correct message
function displayCorrectAlertMessage() {
  $('#correct-flash').toggle();
  setTimeout(
    function () {
      $('#correct-flash').fadeOut('slow');
    }, 2000);
}
//--displays incorrect message
function displayIncorrectAlertMessage() {
  $('#incorrect-flash').toggle();
  setTimeout(
    function () {
      $('#incorrect-flash').fadeOut('slow');
    }, 2000);
}
//--displays answer required message
function displayAnswerRequiredAlertMessage() {
  $('#answer-required-flash').toggle();
  setTimeout(
    function () {
      $('#answer-required-flash').fadeOut('slow');
    }, 2000);
}

//--Responsible for handling submit button click event
function handleSubmitBtn() {
  console.log('`handleSubmitBtn` is working');
  $('main').on('click', '#submit-answer-button', function (e) {
    e.preventDefault();
    let quizIndex = STORE.questionNumber;
    let quizAnswer = STORE.questions[quizIndex].correctAnswer;
    let selectedAnswer = $('input[name="selection"]:checked').val();
    if (!selectedAnswer) {
      displayAnswerRequiredAlertMessage();
    } else if (selectedAnswer == quizAnswer) {
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

//--Responsible for resetting quiz if play again button is clicked
function resetQuiz() {
  $('main').on('click', '#play-again-button', function (e) {
    console.log('reset button is working');
    e.preventDefault(); 
    STORE.questionNumber = 0;
    STORE.score = 0;
    //retrieving first question object
    let firstQuestionObject = STORE.questions[0];
    //creating a quiz question html string
    let quizQuestionElement = generateQuizQuestionsString(firstQuestionObject);
    //replacing congrats message with quiz question html string
    $('#congrats-element').replaceWith(quizQuestionElement);
  })
}

//output: boolean true or false whether return question is the last;
function isCurrentQuestionTheLast() {
  let totalNumberofQuestions = STORE.totalNumberofQuestions;
  let currentQuestionNumber = STORE.questionNumber;
  return totalNumberofQuestions == currentQuestionNumber;
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

//--Responsible for rendering the quiz to the DOM
function renderQuizApp() {
  console.log('`renderQuizApp` is working')
  $('h1').text('World Facts Quiz');
  let questionObject = STORE.questions[STORE.questionNumber];
  let questionHtml = generateQuizQuestionsString
    (questionObject);
  $('main').append(questionHtml);
  $('main').prepend(`<div class="alert-container">
    <strong id="correct-flash" class="hidden alert">Correct!</strong>
    <strong id="incorrect-flash" class="hidden alert">Incorrect!</strong>
    <strong id="answer-required-flash" class="hidden alert">Please choose an answer</strong>
  </div>`)
}

//--Responsible for rendering start screen
function renderStartScreen() {
  console.log('`renderStartScreen` is working');
  $('h1').text('Welcome to the World Facts Quiz');
  let startScreenString = generateStartingPageString();
  $('main').append(startScreenString);
}

//handle start button to render the quiz
function startQuizBtn() {
  console.log('`startQuizBtn` is working')
  $('main').on('click', '#start-button', function (e) {
    e.preventDefault();
    let firstQuestionObject = STORE.questions[0];
    //creating a quiz question html string
    let quizQuestionElement = generateQuizQuestionsString(firstQuestionObject);
    //replacing start message with quiz question html string
    $('#start-element').replaceWith(renderQuizApp());
  })
}

//--Render Function
function handleWorldFactsQuizApp() {
  renderStartScreen();
  startQuizBtn();
  handleSubmitBtn();
  resetQuiz();
}

$(handleWorldFactsQuizApp);




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