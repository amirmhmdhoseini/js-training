
let questions = [
    {
        question: 'Which of the following is used to declare a variable in Python?',
        options: ['A) var x = 10', 'B) int x = 10', 'C) x = 10', 'D) let x = 10'],
        answer: 'C'
    },
    {
        question: 'What is the output of the following code? print(2 + 3 * 4)',
        options: ['A) 20', 'B) 14', 'C) 24', 'D) 9'],
        answer: 'B'
    },
    {
        question: 'Which loop is used to repeat a block of code in Python?',
        options: ['A) repeat', 'B) loop', 'C) for', 'D) cycle'],
        answer: 'C'
    },
    {
        question: 'Which data type is used to store True or False values?',
        options: ['A) String', 'B) Integer', 'C) Float', 'D) Boolean'],
        answer: 'D'
    },
    {
        question: 'What is the output of the following code? x = 10; x = x + 5; print(x)',
        options: ['A) 10', 'B) 15', 'C) 5', 'D) 20'],
        answer: 'B'
    },
    {
        question: 'Which keyword is used to define a function in Python?',
        options: ['A) function', 'B) def', 'C) func', 'D) define'],
        answer: 'B'
    },
    {
        question: 'Which operator is used to compare two values for equality in Python?',
        options: ['A) =', 'B) !=', 'C) ==', 'D) ==='],
        answer: 'C'
    },
    {
        question: 'What is the output of the following code? numbers = [1, 2, 3, 4]; print(numbers[0])',
        options: ['A) 1', 'B) 2', 'C) 3', 'D) 4'],
        answer: 'A'
    },
    {
        question: 'Which function is used to get input from a user in Python?',
        options: ['A) print()', 'B) input()', 'C) scan()', 'D) get()'],
        answer: 'B'
    },
    {
        question: 'What is an infinite loop?',
        options: [
            'A) A loop that runs only once',
            'B) A loop that executes no instructions',
            'C) A loop that continues running without a proper stopping condition',
            'D) A loop that runs exactly twice'
        ],
        answer: 'C'
    }
]

const startScreen = document.getElementById('start-screen')
const startButton = document.getElementById('start-btn')

const quizScreen = document.getElementById('quiz-screen')
const currentQuestion = document.getElementById('current-question')
const progressPercent = document.getElementById('progress-percent')
const progressFill = document.getElementById('progress-fill')
const questionText = document.getElementById('question-text')
const optionsContainer = document.getElementById('options-container')
const answerHint = document.getElementById('answer-hint')
const nextButton = document.getElementById('next-btn')

const resultScreen = document.getElementById('result-screen')
const finalScore = document.getElementById('final-score')
const correctCount = document.getElementById('correct-count')
const wrongCount = document.getElementById('wrong-count')
const resultMessage = document.getElementById('result-message')
const reviewContainer = document.getElementById('review-container')
const restartButton = document.getElementById('restart-btn')

let userCurrentQuestion = 0
let userAnswers = []
let score = 0

startButton.addEventListener('click', () => {
    startScreen.hidden = true
    quizScreen.hidden = false
    showQuestion()
})

function showQuestion() {
    const question = questions[userCurrentQuestion]

    currentQuestion.textContent = userCurrentQuestion + 1
    questionText.textContent = question.question

    optionsContainer.innerHTML = ''

    nextButton.disabled = true
    answerHint.textContent = 'Choose the correct answer'

    let progress = Math.round((userCurrentQuestion / questions.length) * 100)

    progressPercent.textContent = progress + '%'
    progressFill.style.width = progress + '%'

    for (let i = 0; i < question.options.length; i++) {
        const optionButton = document.createElement('button')

        optionButton.className = 'option'
        optionButton.textContent = question.options[i]

        optionButton.addEventListener('click', () => {
            selectAnswer(optionButton, question.options[i])
        })

        optionsContainer.appendChild(optionButton)
    }
}

function selectAnswer(selectedButton, selectedOption) {
    const allOptions = optionsContainer.querySelectorAll('.option')

    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].classList.remove('selected')
    }

    selectedButton.classList.add('selected')

    userAnswers[userCurrentQuestion] = selectedOption.charAt(0)

    nextButton.disabled = false
    answerHint.textContent = 'Answer selected!'
}

nextButton.addEventListener('click', () => {
    if (userAnswers[userCurrentQuestion] === questions[userCurrentQuestion].answer) {
        score++
    }

    userCurrentQuestion++

    if (userCurrentQuestion < questions.length) {
        showQuestion()
    }
    else {
        showResult()
    }
})

function showResult() {
    quizScreen.hidden = true
    resultScreen.hidden = false

    let wrongAnswers = questions.length - score

    finalScore.textContent = score
    correctCount.textContent = score
    wrongCount.textContent = wrongAnswers

    if (score === 10) {
        resultMessage.textContent = 'Perfect! Excellent work!'
    }
    else if (score >= 7) {
        resultMessage.textContent = 'Great job! Well done!'
    }
    else if (score >= 5) {
        resultMessage.textContent = 'Good effort! Keep practicing!'
    }
    else {
        resultMessage.textContent = 'Keep learning! You can do better!'
    }

    progressPercent.textContent = '100%'
    progressFill.style.width = '100%'

    showReview()
}

function showReview() {
    reviewContainer.innerHTML = ''

    for (let i = 0; i < questions.length; i++) {
        const reviewItem = document.createElement('div')
        reviewItem.className = 'review-item'

        const questionTitle = document.createElement('h3')
        questionTitle.textContent = (i + 1) + '. ' + questions[i].question

        const userAnswer = document.createElement('p')

        let userOption = 'No answer'

        for (let j = 0; j < questions[i].options.length; j++) {
            if (questions[i].options[j].charAt(0) === userAnswers[i]) {
                userOption = questions[i].options[j]
            }
        }

        userAnswer.textContent = 'Your Answer: ' + userOption

        if (userAnswers[i] === questions[i].answer) {
            userAnswer.className = 'correct-answer'
        }
        else {
            userAnswer.className = 'wrong-answer'
        }

        const correctAnswer = document.createElement('p')

        let correctOption = ''

        for (let j = 0; j < questions[i].options.length; j++) {
            if (questions[i].options[j].charAt(0) === questions[i].answer) {
                correctOption = questions[i].options[j]
            }
        }

        correctAnswer.textContent = 'Correct Answer: ' + correctOption
        correctAnswer.className = 'correct-answer'

        reviewItem.appendChild(questionTitle)
        reviewItem.appendChild(userAnswer)
        reviewItem.appendChild(correctAnswer)

        reviewContainer.appendChild(reviewItem)
    }
}

restartButton.addEventListener('click', () => {
    userCurrentQuestion = 0
    userAnswers = []
    score = 0

    resultScreen.hidden = true
    startScreen.hidden = false

    progressPercent.textContent = '0%'
    progressFill.style.width = '0%'

    reviewContainer.innerHTML = ''
})
