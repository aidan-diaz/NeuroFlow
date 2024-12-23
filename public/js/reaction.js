// Player clicks start button
document.querySelector('#startGame').addEventListener('click', startGame)
document.querySelector('#startGame').addEventListener('click', targetFlip)
document.querySelector('#testScreenButton').addEventListener('click', displayTest)
document.querySelector('#testScreenButton').addEventListener('click', hideInstructions)
const highScore = document.querySelector('#highScore');


function displayTest() {
  document.querySelector('.scoreBoard').classList.remove('hidden')
  document.querySelector('.gameContainer').classList.remove('hidden')
  document.querySelector('.goodButton').classList.remove('hidden')
}

function hideInstructions() {
  document.querySelector('#instructionsContainer').classList.add('hidden')
}

// Trigger start of game
// Timer starts, counting down from 60sec to 0
let countdown = 60
let highScoreValue = parseInt(highScore.innerText)
function startGame() {
  document.querySelector('#startGame').style.display = 'none'
  countdown = 60
  const scoreElement = document.querySelector('#count');
  const interval = setInterval(() => {
    document.querySelector('.timer').innerHTML = 'Time Left: <span id="clock">`${countdown}`</span>'
    document.querySelector('.timer').style.color = 'inherit'
    document.querySelector('#clock').innerText = countdown

    countdown--;

    if (countdown <= -1) {
      clearInterval(interval);
      document.querySelector('.timer').innerHTML = '!!!TEST OVER!!!'
      document.querySelector('.timer').style.color = 'red'
      document.querySelector('#startGame').style.display = 'block'
      document.querySelector('#startGame').innerText = 'TEST AGAIN'
      addNewReactionTestScore(scoreElement)
      updateHighScore(highScoreValue)
      scoreElement.innerText = 0
    }

  }, 1000);

}

function targetFlip() {
  const tarNum = Math.floor(Math.random() * 25) + 1;
  const scoreElement = document.querySelector('#count');

  function handleClick() {
    let score = parseInt(scoreElement.innerText) + 1;
    if(countdown > -1) {
      // Increment the score
      scoreElement.innerText = score;
    }

    // Update the high score if the current score exceeds the high score
    if (score > highScoreValue) {
      highScoreValue = score;
      highScore.innerText = highScoreValue;
    }
    document.querySelector(`.tar${tarNum}`).removeEventListener('click', handleClick);

    // Call targetFlip again to show a new red target
    targetFlip();

  }

  if (countdown > -1) {
    // Reset the color of all target elements
    document.querySelectorAll('.target').forEach(element => {
      element.style.background = 'radial-gradient(circle, #0D446C, #167DC6)';
      // Remove click event listener from all elements
      element.removeEventListener('click', handleClick);
    });

    // Set the color of the random target to red
    document.querySelector(`.tar${tarNum}`).style.background = 'red';
    document.querySelector(`.tar${tarNum}`).classList.add('flipped');


    // Add a click event listener to the red target element
    document.querySelector(`.tar${tarNum}`).addEventListener('click', handleClick);
    document.querySelector(`.tar${tarNum}`).addEventListener('animationend', function () {
      this.classList.remove('flipped');
    }, { once: true });
   
  }else {
    document.querySelectorAll('.target').forEach(element => {
      element.style.background = 'radial-gradient(circle, #0D446C, #167DC6)';
      element.removeEventListener('click', handleClick);
    });
  }
}

function addNewReactionTestScore(scoreElement) {
  fetch('/reactionTests/addNewReactionTestScore', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      newScore: parseFloat(scoreElement.innerText)
    })
  })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
    .catch(err => {
      console.log(`error ${err}`)
  })
}

function updateHighScore(highScoreValue) {
  fetch('/reactionTests/updateReactionTestHighScore', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      highScore: parseFloat(highScoreValue)
    })
  })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
    .catch(err => {
      console.log(`error ${err}`)
  })
}

