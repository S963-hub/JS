'use strict';


const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

let scores,activePlayer,currentScore,playing;

// remove image
const dice = document.querySelector('.dice');
dice.classList.add('hidden');


// init method
const init =  function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
  
    score0.textContent = 0;
    score1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
  
    dice.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();

// active plater method
const active_player = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
//roll button
btnRoll.addEventListener('click', function () {
    if (playing) {
        
    
    let randomNumber = Math.trunc(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.src = `dice-${randomNumber}.png`;

    if (randomNumber !== 1 ) {
        currentScore += randomNumber;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        active_player(); 
    }
}
})

//hold button
btnHold.addEventListener('click', function () {
    if (playing) {
      // 1. Add current score to active player's score
      scores[activePlayer] += currentScore;
      // scores[1] = scores[1] + currentScore
  
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[activePlayer];
  
      // 2. Check if player's score is >= 100
      if (scores[activePlayer] >= 100) {
        // Finish the game
        playing = false;
        dice.classList.add('hidden');
  
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
      } else {
        // Switch to the next player
        active_player(); 
      }
    }
});

//new button

btnNew.addEventListener('click',init)



