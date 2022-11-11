
const questions = [
    {
        question: "alone",
        options: [
            {text:"sevimli", correct: false},
            {text:"yalnız", correct:true},
            {text:"güzel", correct:false},
            {text:"çekici", correct:false}
            
        ]
    },
    {
        question: "appearance",
        options: [
            {text:"kel", correct: false},
            {text:"sarışın/sarı", correct:false},
            {text:"neşeli", correct:false},
            {text:"dış görünüş", correct:true}
            
        ]
    },
    {
        question: "attractive",
        options: [
            {text:"sevimli", correct: false},
            {text:"yalnız", correct:false},
            {text:"güzel", correct:false},
            {text:"çekici", correct:true}
            
        ]
    },
    {
        question: "bald",
        options: [
            {text:"kel", correct: true},
            {text:"sarışın/sarı", correct:false},
            {text:"neşeli", correct:false},
            {text:"çekici", correct:false}
        ]
    }
]

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainer = document.getElementById('question-container')

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')

document.getElementById('q_num').innerText = questions.length


let shuffledQuestions, currentQuestionIndex
let ans_correct = 0



startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', ()=>{
    currentQuestionIndex++
    setNextQuestion()
})


function startGame() {
    
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(()=> Math.random() -0.5)
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide')
    setNextQuestion()
    document.getElementById('ans_correct').innerText =""
    ans_correct = 0

}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.options.forEach(option=>{
        const button = document.createElement('button')
        button.innerText = option.text
        button.classList.add('btn')
        if(option.correct){
            button.dataset.correct = option.correct
        }
        button.addEventListener('click', selectAnswer )
        answerButtons.appendChild(button)
    })

}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }

}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtons.children).forEach(button=>{
        setStatusClass(button, button.dataset.correct)
    })
    

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        document.getElementById('ans_correct').innerText = `${ans_correct++} / ${questions.length}`
    }else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


