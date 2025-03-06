const questions = [

    {
        question: "What is the output of console.log(typeof null);?",
        answers: [
            {text:"null", correct:false},
            {text:"undefined", correct:false},
            {text:"object", correct:true},
            {text:"string", correct:false}
        ]
    },

    {
        question: "Which keyword is used to define a constant variable in JavaScript?",
        answers: [
            {text:"let", correct:false},
            {text:"var", correct:false},
            {text:"const", correct:true},
            {text:"static", correct:false}
        ]
    },


    {
        question: "What will console.log(2 + '2' - 1); output?",
        answers: [
            {text:"21", correct:false},
            {text:"3", correct:false},
            {text:"Nan", correct:true},
            {text:"undefined", correct:false}
        ]
    },


    {
        question: "What does the map() function do in JavaScript?",
        answers: [
            {text:"Modifies an array in place", correct:false},
            {text:"Creates a new array with transformed elements", correct:true},
            {text:"Removes elements from an array", correct:false},
            {text:"Checks if an array contains a value", correct:false}
        ]
    },

    {
        question: "Which of the following is NOT a valid way to declare a function?",
        answers: [
            {text:" function myFunc() {};", correct:false},
            {text:"const myFunc = function() {};", correct:false},
            {text:"const myFunc = () => {};", correct:true},
            {text:"const myFunc := () => {};", correct:false}
        ]
    },


    {
        question: "What is the difference between == and === in JavaScript?",
        answers: [
            {text:"== checks only values, === checks values and types", correct:false},
            {text:"== checks values and types, === checks only values", correct:false},
            {text:" Both perform the same operation", correct:true},
            {text:"=== performs implicit type conversion", correct:false}
        ]
    },


    {
        question: "Which of the following removes the last element from an array?",
        answers: [
            {text:"arr.pop();", correct:false},
            {text:"arr.shift();", correct:false},
            {text:"arr.splice(0, 1);", correct:true},
            {text:"arr.slice(-1);", correct:false}
        ]
    },


    {
        question: "What will console.log(typeof NaN); return?",
        answers: [
            {text:"Nan", correct:false},
            {text:"undefined", correct:false},
            {text:"number", correct:true},
            {text:"null", correct:false}
        ]
    },


    {
        question: "Which statement correctly explains this in JavaScript?",
        answers: [
            {text:" Always refers to the global object", correct:false},
            {text:" Depends on how a function is called", correct:false},
            {text:"Refers to the previous variable", correct:true},
            {text:"Only works inside arrow functions", correct:false}
        ]
    },

    {
        question: "Which method is used to convert a string to lowercase?",
        answers: [
            {text:"toLowerCase()", correct:false},
            {text:"lowerCase()", correct:false},
            {text:"convertLowerCase()", correct:true},
            {text:"string.toLower()", correct:false}
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click" , selectAnswer);
        
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }

        button.disabled = true;

    });

    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();