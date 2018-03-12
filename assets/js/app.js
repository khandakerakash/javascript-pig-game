/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying

init()

// By Default, dice are not visible
document.querySelector('.dice').style.display = 'none'

// After Click event, dice will be visible along a number
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1. Produce Random Number between 1 to 6
        let dice = Math.floor(Math.random() * 6) + 1

        // 2. Display the result with necessary dice image
        let diceDOM = document.querySelector('.dice')
        diceDOM.style.display = 'block'
        diceDOM.src = 'assets/images/dice-' + dice + '.png'

        // 3. Update the round score IF the rolled number was NOT 1
        if (dice !== 1) {
            // Add Score
            roundScore += dice
            document.querySelector('#current-' + activePlayer).textContent = roundScore
        }else {
            // Next Player
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
            roundScore = 0

            document.getElementById('current-0').textContent = '0'
            document.getElementById('current-1').textContent = '0'

            document.querySelector('.player-0-panel').classList.toggle('active')
            document.querySelector('.player-1-panel').classList.toggle('active')
            document.querySelector('.dice').style.display = 'none'
        }
    }
})

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        // Add CURRENT Score to Global Score
        scores[activePlayer] += roundScore

        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]

        // Read the user input
        let userInput = document.querySelector('.final-score').value
        let winningScore
        // Undefined, 0, null or "" are COERCED to false And anything is to true
        if (userInput) {
            winningScore = userInput
        }else {
            winningScore = 100
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = "WINNER!"
            document.querySelector('.dice').style.display = 'none'
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false
        }else {
            // Next Player
            nextPlayer()
        }
    }
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0

    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.querySelector('.dice').style.display = 'none'
}

document.querySelector('.btn-new').addEventListener('click', init)

function init() {
    scores = [0,0]
    roundScore = 0
    activePlayer = 0

    gamePlaying = true

    // By default, Dice is not visible
    document.querySelector('.dice').style.display = 'none'

    // By default, all scores should have zero
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById('name-0').textContent = "PLAYER 1"
    document.getElementById('name-1').textContent = "PLAYER 2"
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
}

document.querySelector('.btn-rule').addEventListener('click', function () {
    document.querySelector('.rules-item').style.display = 'block'
})
