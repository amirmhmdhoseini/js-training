const cardForm = document.getElementById('card-form')
const cardQuestion = document.getElementById('card-question')
const cardAnswer = document.getElementById('card-answer')
const cardsContainer = document.getElementById('cards-container')
const cardCount = document.getElementById('card-count')
const emptyMessage = document.getElementById('empty-message')
const addCardBtn = document.getElementById('add-card-btn')

let cards = JSON.parse(localStorage.getItem('cards')) || []
let editIndex = null

cardForm.addEventListener('submit', (event) => {

    event.preventDefault()

    const question = cardQuestion.value
    const answer = cardAnswer.value

    const newCard = {
        question: question,
        answer: answer
    }

    if (editIndex === null) {
        cards.push(newCard)
    }
    else {
        cards[editIndex] = newCard
    }

    localStorage.setItem('cards', JSON.stringify(cards))

    cardForm.reset()
    editIndex = null
    addCardBtn.textContent = 'Add Card'

    renderCards()
})

function renderCards() {

    cardsContainer.innerHTML = ''
    cardCount.textContent = cards.length

    if (cards.length === 0) {
        emptyMessage.textContent = 'No cards yet. Add your first card!'
        cardsContainer.appendChild(emptyMessage)
        return
    }

    cards.forEach((card, index) => {

        const myCard = document.createElement('div')
        myCard.className = 'memory-card'

        const questionElement = document.createElement('h3')
        questionElement.textContent = card.question
        myCard.appendChild(questionElement)

        const answerElement = document.createElement('p')
        answerElement.style.display = 'none'
        answerElement.textContent = card.answer
        myCard.appendChild(answerElement)

        const flipButton = document.createElement('button')
        flipButton.textContent = 'Show Answer'
        flipButton.className = 'flip-btn'

        flipButton.addEventListener('click', () => {

            if (answerElement.style.display === 'none') {
                answerElement.style.display = 'block'
                flipButton.textContent = 'Hide Answer'
            }
            else {
                answerElement.style.display = 'none'
                flipButton.textContent = 'Show Answer'
            }

        })

        myCard.appendChild(flipButton)

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Delete'
        deleteButton.className = 'delete-btn'
        myCard.appendChild(deleteButton)

        deleteButton.addEventListener('click', () => {

            cards.splice(index, 1)

            localStorage.setItem('cards', JSON.stringify(cards))

            renderCards()

        })

        const editButton = document.createElement('button')
        editButton.textContent = 'Edit'
        editButton.className = 'edit-btn'
        myCard.appendChild(editButton)

        editButton.addEventListener('click', () => {

            cardQuestion.value = card.question
            cardAnswer.value = card.answer

            editIndex = index
            addCardBtn.textContent = 'Update Card'

        })

        cardsContainer.appendChild(myCard)

    })

}

renderCards()
