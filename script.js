const questions = [
    {
        queston:"which is largest animal in the world?",
        answers:[
            {text:"shark",correct:false},
            {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"giraffe",correct:false},

        ]
    },
    {
        queston:"which is the smallest continent in the world?",
        answers:[
            {text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Artic",correct:false},
            {text:"Africa",correct:false},
        ]
    },
    {
        queston:"which is largest dessert in the world?",
        answers:[
            {text:"kalahari",correct:false},
            {text:"gobi",correct:false},
            {text:"sahara",correct:false},
            {text:"antartica",correct:true},
        ]
    },
    {
        queston:"which is the most populus country in the world",
        answers:[
            {text:"India",correct:false},
            {text:"china",correct:true},
            {text:"USA",correct:false},
            {text:"Pakistan",correct:false},
        ]
    }
];

const questionsElement = document.querySelector(".question");
const answerButton = document.querySelector(".answer-button");
const nextButton = document.querySelector(".next")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score =0;
    nextButton.innerHTML = "Next";
    showQuestion()
}
function showQuestion(){
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionsElement.innerHTML = questionNo + ". "+currentQuestion.queston;

    currentQuestion.answers.forEach(answers =>{
               const button = document.createElement("button");
               button.innerHTML = answers.text;
               button.classList.add('btn');
               answerButton.appendChild(button);//we use append child for connecting created button to answer button
               if(answers.correct){
                button.dataset.correct = answers.correct;
               }
               button.addEventListener("click",selectAnswer);
    });
}

function resetstate(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
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

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showscore(){
    resetstate();
    questionsElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showscore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();