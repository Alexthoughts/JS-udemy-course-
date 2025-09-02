'use strict';
//add win count
//add players names
//add to the modal before start how many win will be played
//add to the modal before start how long one game is
//after win show modal with congradulations

const inputNamePlayer1 = document.querySelector('#player1-name');
const inputNamePlayer2 = document.getElementById('player2-name');
const inputWinsCount = document.getElementById('input-wins');
const inputMaxScore = document.getElementById('max-score');
const btnGo = document.querySelector('.btn-go');
const btnResetGame = document.querySelector('.btn-reset');
const overlay = document.querySelector('.overlay');

//2 ways to select element by id
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const wins0El = document.getElementById('wins-0');
const wins1El = document.getElementById('wins-1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores,
  currentScore,
  activePlayer,
  namePlayer1,
  namePlayer2,
  winsCount,
  maxScore,
  wins; //defined empty variables

btnGo.addEventListener('click', function () {
  namePlayer1 = inputNamePlayer1.value;
  namePlayer2 = inputNamePlayer2.value;
  winsCount = inputWinsCount.value;
  maxScore = inputMaxScore.value;

  //check for each element, if it filled in, if not -> mark it and show alert, if already filled remove red border
  const elements = document.querySelectorAll('.required');
  elements.forEach(element => {
    if (element.value === '') {
      document.querySelector('.alert').classList.remove('hidden');
      element.classList.add('alert-input');
    } else if (element.value !== '') {
      element.classList.remove('alert-input');
    }
  });

  if (
    namePlayer1.length > 0 &&
    namePlayer2.length > 0 &&
    winsCount.length > 0 &&
    maxScore.length > 0
  ) {
    document.querySelector('#name--0').textContent = namePlayer1;
    document.querySelector('#name--1').textContent = namePlayer2;
    document.querySelector('.alert').classList.add('hidden');
    document.querySelector('.modal').classList.add('hidden');
    overlay.classList.add('hidden');
    init();
  }
});

wins = [0, 0];

function init() {
  scores = [0, 0]; //score of player 0 and 1
  currentScore = 0;
  activePlayer = 0; //0 or 1

  //Starting conditions
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0; //reset score
  current1El.textContent = 0; //reset score

  diceEl.classList.add('hidden'); //make dice unvisible
  btnRoll.classList.remove('hidden'); //visible button
  btnHold.classList.remove('hidden'); //visible button
  diceEl.classList.remove('hidden'); //visible dice
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');
  btnNew.classList.remove('hidden');
  document.querySelector(`.player--0`).classList.add('player--active');
}

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //if activePlayer = 1, new player = 0...
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1; //number from 1 to 6
  //2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`; //src = source from HTML, and display selected image
  //3. Check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    //Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore; //add current score to active player
  } else {
    //Switch to next player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  //1. Add current score to active player's score
  scores[activePlayer] += currentScore; //active player 1 or 0 (scores[1] = scores[1] + currentScore)
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer]; //add score to active player
  //2. Check if player's score is >=maxScore
  if (scores[activePlayer] >= maxScore) {
    //Finish the game
    btnRoll.classList.add('hidden'); //unvisible button
    btnHold.classList.add('hidden'); //unvisible button
    diceEl.classList.add('hidden'); //unvisible dice
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    wins[activePlayer] += 1; //add 1 win to winner
    document.getElementById(`wins-${activePlayer}`).textContent =
      wins[activePlayer]; //show added win to active player
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    //Check if the player already win
    if (wins[activePlayer] == winsCount) {
      btnNew.classList.add('hidden');
      let winner;
      if (activePlayer === 0) {
        winner = namePlayer1;
      } else {
        winner = namePlayer2;
      }
      document.querySelector('.win-player').textContent = `${winner} win!`;
      document.querySelector('.win--modal').classList.remove('hidden');
      overlay.classList.remove('hidden');
    }
  } else {
    //Switch to the next player
    switchPlayer();
  }
});

//button New raund
btnNew.addEventListener('click', init);

//button New game
btnResetGame.addEventListener('click', function () {
  overlay.classList.remove('hidden');
  init();
  wins = [0, 0];
  document.getElementById(`wins-0`).textContent = 0;
  document.getElementById(`wins-0`).textContent = 0;
  document.querySelector('.win--modal').classList.add('hidden');
  document.querySelector('.modal').classList.remove('hidden');
});

//close start modal
document.querySelector('.close-modal').addEventListener('click', function () {
  document.querySelector('.modal').classList.add('hidden');
  overlay.classList.add('hidden');
});

//close final modal
document
  .querySelector('#close-win-modal')
  .addEventListener('click', function () {
    document.querySelector('.win--modal').classList.add('hidden');
    overlay.classList.add('hidden');
  });

//close alert
document.querySelector('.alert-close').addEventListener('click', function () {
  document.querySelector('.alert').classList.add('hidden');
});
