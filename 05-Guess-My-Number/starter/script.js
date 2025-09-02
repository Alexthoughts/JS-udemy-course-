'use strict';

/*
console.log(document.querySelector('.message').textContent); //return the text from the element with class "message" in HTML
document.querySelector('.message').textContent = 'Correct number'; //change text content in element with class "message" in HTML
document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 20;

console.log(document.querySelector('.guess').value); //get the value of .guess
document.querySelector('.guess').value = 23; //set the value to the input

*/

let secretNumber = Math.trunc(Math.random() * 20) + 1; //generate random number from 1 to 20
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //*html class is 'btn check', but use only 'check', because another element also have 'btn'
  //click -> type of an event
  //then you need to add expected result -> function

  if (!guess) {
    //input is empty (return 0 -> falsy value)
    displayMessage('⛔ No number');
  } else if (guess === secretNumber) {
    //guess number is correct
    document.querySelector('body').style.backgroundColor = '#60b347'; //change backgroung collor
    document.querySelector('.number').style.width = '30rem'; //change the width of the field "number"
    displayMessage('😍 YOU WIN!');
    document.querySelector('.number').textContent = secretNumber; //show secret number
    //highscore
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
    //When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '🙄 Too high!' : '🙄 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('😂 You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

//button Again
//reset backgroud color, width, text content, and number
document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('body').style.backgroundColor = '#1a1925';
  document.querySelector('.number').style.width = '15rem';
  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  //new secret number
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  //reset score
  score = 20;
  document.querySelector('.score').textContent = score;
  //delete the last guess number
  document.querySelector('.guess').value = '';
});
