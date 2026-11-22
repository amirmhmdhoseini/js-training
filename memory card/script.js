const cardForm = document.getElementById('card-form')
const cardQuestion = document.getElementById('card-question')
const cardAnswer = document.getElementById('card-answer')
const cardsContainer = document.getElementById('cards-container')
const cardCount = document.getElementById('card-count')
const emptyMessage = document.getElementById('empty-message')

let cards = []

cardForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const question = cardQuestion.value
    const answer = cardAnswer.value
    const newCard = {
        question : question,
        answer : answer
    }
    cards.push(newCard)
    cardForm.reset()
    renderCards()
})

function renderCards(){
    cardsContainer.innerHTML = ''
    if (cards.length === 0){
        emptyMessage.textContent = 'No cards yet. Add your first card!'
        cardsContainer.appendChild(emptyMessage)
        return
    }
    cardCount.textContent = cards.length
    cards.forEach((card) => {
        const myCard = document.createElement('div')
        myCard.className = 'memory-card'

        const questionElement = document.createElement('h3')
        questionElement.textContent = card.question

        myCard.appendChild(questionElement)

        const answerElement = document.createElement('p')
        answerElement.textContent = card.answer
        myCard.appendChild(answerElement)

        cardsContainer.appendChild(myCard)

})
    console.log(cards)
}
