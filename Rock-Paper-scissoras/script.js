
let rock = document.getElementById('rock')
let scissors = document.getElementById('scissors')
let paper = document.getElementById('paper')

let myChoice = document.getElementById('player-choice')
let player2Choice = document.getElementById('player2-choice')
let result = document.getElementById('result')
let message = document.getElementById('result-message')

let player1Selection = null
let player2Selection = null
let roundComplete = false

document.addEventListener('click', (event) => {

    const button = event.target.closest('.choice-btn')

    if (!button) {
        return
    }

    const choice = button.dataset.choice

    if (roundComplete) {
        player1Selection = null
        player2Selection = null
        roundComplete = false

        myChoice.textContent = '❔'
        player2Choice.textContent = '❔'
        result.textContent = 'Make Your Move!'
        message.textContent = 'Both players should choose to start.'
    }

    if (button.id === 'rock' || button.id === 'paper' || button.id === 'scissors') {

        player1Selection = choice
        myChoice.textContent = choice.toUpperCase() + '!'

    }

    else if (button.id === 'rock2' || button.id === 'paper2' || button.id === 'scissors2') {

        player2Selection = choice
        player2Choice.textContent = choice.toUpperCase() + '!'

    }

    if (player1Selection !== null && player2Selection !== null) {

        result.textContent = gameResult(player1Selection, player2Selection)

        if (result.textContent === 'YOU WIN :)') {
            message.textContent = 'Player 1 wins this round!'
        }
        else if (result.textContent === 'YOU LOSE :(') {
            message.textContent = 'Player 2 wins this round!'
        }
        else {
            message.textContent = "It's a draw! Try again."
        }

        roundComplete = true

    }

    else if (player1Selection !== null) {
        result.textContent = 'Waiting...'
        message.textContent = 'Player 1 has chosen. Waiting for Player 2.'
    }

    else {
        result.textContent = 'Waiting...'
        message.textContent = 'Player 2 has chosen. Waiting for Player 1.'
    }

})


function gameResult (myChoice, compChoice){
    let ans = null

    if (myChoice === compChoice){
        ans = 'DRAW :/'
    }
    else if (myChoice === 'rock' && compChoice === 'scissors'){
        ans = 'YOU WIN :)'
    }
    else if (myChoice === 'rock' && compChoice === 'paper'){
        ans = 'YOU LOSE :('
    }
    else if (myChoice === 'paper' && compChoice === 'rock'){
        ans = 'YOU WIN :)'
    }
    else if (myChoice === 'paper' && compChoice === 'scissors'){
        ans = 'YOU LOSE :('
    }
    else if (myChoice === 'scissors' && compChoice === 'paper'){
        ans = 'YOU WIN :)'
    }
    else if (myChoice === 'scissors' && compChoice === 'rock'){
        ans = 'YOU LOSE :('
    }

    return ans
}
