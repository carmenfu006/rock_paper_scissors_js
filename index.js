document.addEventListener('DOMContentLoaded', function() {
  let buttons = document.querySelectorAll('button[type="option"]');
  let options = ['Rock', 'Paper', 'Scissors'];
  let result = document.getElementById('result');
  let player_score = document.getElementById('player_score');
  let score = 0;

  let start_button = document.querySelector('button[type="start"]');
  let timerDisplay = document.getElementById('player_time_remaining');
  let timer;
  let timeRemaining;
  let disabledGame = true;


  start_button.addEventListener('click', function() {
    if (disabledGame === true) {
      disabledGame = false;
      setTimer();
      score = 0;
      player_score.innerHTML = `scores: ${score}`
    } else {
      gameResult();
    }
  })

  buttons.forEach(function (button) {
    button.addEventListener('click', playGame);
  })

  function playGame(element) {
    if (disabledGame === false) {
      let playerOption = element.currentTarget.value;
      let computerOption = options[getRandomNumber()];

      if (playerOption === 'Rock' && computerOption === 'Scissors') {
        result.innerHTML = 'You win!'
        calculateScore()
      } else if (playerOption === 'Scissors' && computerOption === 'Paper') {
        result.innerHTML = 'You win!'
        calculateScore()
      } else if (playerOption === 'Paper' && computerOption === 'Rock') {
        result.innerHTML = 'You win!'
        calculateScore()
      } else if (playerOption === 'Rock' && computerOption === 'Paper') {
        result.innerHTML = 'You lose!'
      } else if (playerOption === 'Paper' && computerOption === 'Scissors') {
        result.innerHTML = 'You lose!'
      } else if (playerOption === 'Scissors' && computerOption === 'Rock') {
        result.innerHTML = 'You lose!'
      } else {
        result.innerHTML = 'It is a tied!'
      }
    }
  }

  function getRandomNumber() {
    return Math.floor(Math.random() * options.length);
  }

  function calculateScore() {
    score += 1;
    player_score.innerHTML = `scores: ${score}`;
  }

  function setTimer() {
    if (id('time-1').checked) {
      timeRemaining = Number(id('time-1').value);
    } else if (id('time-2').checked) {
      timeRemaining = Number(id('time-2').value);
    } else {
      timeRemaining = Number(id('time-3').value);
    }

    timerDisplay.innerHTML = convertTime(timeRemaining);
    start_button.innerHTML = 'Stop'

    timer = setInterval(function () {
          timeRemaining --;

          if (timeRemaining === 0) {
            gameResult();
          } else {
            timerDisplay.innerHTML = convertTime(timeRemaining);
          }
    }, 1000)
  }

  function convertTime(time) {
    let mins = Math.floor(time/60);
    let secs = time % 60;

    if (mins < 10) {
      mins = `0${mins}`;
    }
    if (secs < 10) {
      secs = `0${secs}`;
    }
    return `Time Left: ${mins} : ${secs}`;
  }

  function gameResult() {
    disabledGame = true;
    clearTimeout(timer);
    timerDisplay.innerHTML = `Your score is ${score}`;
    start_button.innerHTML = 'Play again';
    result.innerHTML = '';
  }

  function id(id) {
    return document.getElementById(id)
  }
})