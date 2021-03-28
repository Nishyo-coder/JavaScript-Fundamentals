var startbutton = document.getElementById('start-btn')
var nextbutton = document.getElementById('next-btn')
var questioncontainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerbuttonsElement = document.getElementById("answer-buttons")
var timerElement = document.querySelector(".timer-count");
var isCorrect = false;
var timer;
var timerCount;
var scorecounter = 0;
var score= document.getElementById('score')

let shuffledQuestions, currentQuestionIndex

//when button clicks, start quiz.
startbutton.addEventListener("click", StartQuiz)


//when next button is click, moves on to the next question 
nextbutton.addEventListener('click', ()=> {
  currentQuestionIndex++
  SetNextQuestion()
})

//calling the startquiz function 
function StartQuiz() {
timerCount = 10;
startbutton.classList.add('hide')
shuffledQuestions = questions.sort(() => Math.random() - .5)
currentQuestionIndex = 0
questioncontainerElement.classList.remove('hide')
startTimer()
SetNextQuestion()
}

function startTimer() {
timer = setInterval(function() {
timerCount--;
timerElement.textContent = timerCount;
if (timerCount >= 0) {
  // Tests if win condition is met
  if (isCorrect && timerCount > 0) {
    
    // Clears interval and stops timer
    clearInterval(timer);
    SetNextQuestion();
  }
}
// Tests if time has run out
if (timerCount === 0) {
  // Clears interval
  clearInterval(timer);
  SetNextQuestion();
}
}, 1000);

}
function SetNextQuestion() {
  resetState()
ShowQuestion(shuffledQuestions[currentQuestionIndex])

}
//shows each question from my array of questions
function ShowQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", SelectAnswer)
    answerbuttonsElement.appendChild(button)
  });

}

//removes the and hides the next and answer button when going to next question. 
function resetState(){
  nextbutton.classList.add('hide')
  while(answerbuttonsElement.firstChild) {
  answerbuttonsElement.removeChild(answerbuttonsElement.firstChild)
}

}
//selects answers from the questions in the array
function SelectAnswer(e) {
  var selectedbutton = e.target
  var correct = selectedbutton.dataset.correct
  SetStatusClass(document.body, correct)
Array.from(answerbuttonsElement.children).forEach(button => {
  SetStatusClass(button, button.dataset.correct)
})
nextbutton.classList.remove('hide')

if (shuffledQuestions.length > currentQuestionIndex + 1) {
  nextbutton.classList.remove('hide')
} else {
  scoreButton.innerText = scoreButton + 1
  startbutton.innerText = 'Start Over'
  startbutton.classList.remove('hide')
  setScore()
}
function setScore() {
  
  localStorage.setItem("scorecount", scorecounter);
}
}

function SetStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

var questions = [
  {
    question: "ARRAYS IN JAVASCRIPT CAN BE USED TO STORE",
    answers: [
      { text: 'Numbers and Strings', correct: false},
      { text: 'Other Arrays', correct: false},
      { text: "Booleans", correct: false},
      { text: 'All of These', correct: true},
    ]
  },
{
    question: "Commonly used data types DO NOT inlcude:",
    answers: [
      {text:'Strings', correct: false},
      {text:'Booleans', correct: false},
      {text: 'Alerts', correct: true},
     {text: 'Numbers', correct: false},
    ]
  },
{
  question: "The condition is an if/else statement is enclosed within _____.",
  answers: [
    {text:'Quotes', correct: false},
    {text:'Curly Brackets', correct: false},
    {text: 'Paranthesis', correct: true},
   {text: 'Square Brackets', correct: false},
  ]
},
{
  question: "String values must be enclosed within____ when being assigned to variables.",
  answers: [
    {text:'Commas', correct: false},
    {text:'Curly Brackets', correct: false},
    {text: 'Quotes', correct: true},
   {text: 'Paranthesis', correct: false},
  ]
},
{
  question: "A very useful tool used during development and debugging for printing content to the debugger is____.",
  answers: [
    {text:'JavaScript', correct: false},
    {text:'Terminal/Bash', correct: false},
    {text: 'For Loops', correct: false},
   {text: 'Console.log', correct: true},
  ]
}
]
  
