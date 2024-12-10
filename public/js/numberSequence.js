//want to create a page that users can visit to take a number sequence test
//upon loading the page, user will see instructions for test and a button that can be clicked to proceed to difficulty screen
//when button is clicked, instructions and button will be hidden
//new buttons for difficulty levels will now be displayed
//if user clicks 'easy' difficulty, level one of the easy tests will be displayed
//all of the difficulty buttons will now be hidden until the test ends
//the sequence will show, but one of the numbers will be missing
//if the user correctly identifies the correct missing number, the test will move on to the next level and generate a new sequence
//if the user incorrectly guesses the missing number, the test will end, and the difficulty buttons will appear again.
//upon test ending, the user's score for that difficulty will be saved.
//their high score for that difficulty will also be recorded and updated in the database


//make default level 1, so first test is loaded when a difficulty is selected
let level = 1;
//declare a variable to store current test sequence in
let currentSequence
//eventually store missing index for current test in here
let missingIndex
//store the correct answer for the current sequence in here
let correctAnswer
//need a way to save the current difficulty for the tests
let currentDifficulty
//need variable for current user score
let currentUserScore = 0

let highScore

document.getElementById('testScreenButton').addEventListener('click', toggleInstructionsDisplay)
document.getElementById('testScreenButton').addEventListener('click', showTestContainerButtonDisplay)
document.getElementById('testScreenButton').addEventListener('click', displayScoreBoard)
document.getElementById('submitAnswerButton').addEventListener('click', evaluateUserAnswer)
document.getElementById('hintButton').addEventListener('click', displayHint)

function toggleInstructionsDisplay() {
    document.getElementById('instructionsContainer').classList.toggle('hidden')
}

function showTestContainerButtonDisplay() {
    document.getElementById('testDifficultyButtonContainer').classList.remove('hidden')
}

function hideTestContainerButtonDisplay() {
    document.getElementById('testDifficultyButtonContainer').classList.add('hidden')
}

function displayTestContainer() {
    document.getElementById('testContainer').classList.remove('hidden')
}

function startTest(difficulty) {
    currentDifficulty = difficulty
    fetchHighScore(currentDifficulty)
    clearCurrentSequence()
    clearAnswerResult()
    clearUserInput()
    hideTestContainerButtonDisplay()
    displayCurrentLevel()
    displayCurrentUserScore(currentUserScore)
    displayTestContainer()
    displayAnswerItemsDisplay()
    loadCurrentLevel(currentDifficulty)
}

//append to #testContainer div when generating tests

function loadCurrentLevel(currentDifficulty) {
    //only 20 levels per difficulty, cannot render a level once all are completed
    if(level < 21) {
        //pass in the difficulty to grab the level from the levels database variable based on the difficulty
        const levelData = levelsDatabase[`${currentDifficulty}Levels`][level]
        console.log(currentDifficulty, levelData)
        generateLevelSequence(levelData)
    }else {
        //figure out what to clear and display here
        showTestContainerButtonDisplay()
        hideAnswerItemsDisplay()
        clearCurrentSequence()
        clearHint()
        showAnswerResult('All levels passed. Great job!')
        addNewNumberSequenceTestScore(currentDifficulty)
        updateHighScore(currentDifficulty)
        //reset level so users can start again if desired
        level = 1
        updateCurrentUserScore(0)
    }
}

function generateLevelSequence(levelData) {
    //spread the level sequence into a new array
    currentSequence = [...levelData.sequence]
    //make the missing index random
    missingIndex = Math.floor(Math.random() * currentSequence.length)
    //update the correct answer to be whatever the missing number from the index is
    correctAnswer = currentSequence[missingIndex]
    //generate the missing num as a question mark when displaying
    currentSequence[missingIndex] = "?"
    displayCurrentLevel()
    displayCurrentSequence()
}


function displayScoreBoard() {
    document.getElementById('scoreboardContainer').classList.remove('hidden')
}

//show pattern on screen

function displayCurrentSequence() {
    const testContainer = document.getElementById('currentTest')
    const sequenceSpan = document.createElement('span')
    //add a class to it to make font larger
    sequenceSpan.classList.add('sequenceSpan')
    //join the elements back into a string with a comma and a space
    sequenceSpan.innerText = currentSequence.join(', ')
    testContainer.appendChild(sequenceSpan)
}

function displayCurrentLevel() {
    const difficultyDisplay = currentDifficulty.substring(0, 1).toUpperCase() + currentDifficulty.substring(1)
    const testContainer = document.querySelector('.currentLevel')
    testContainer.innerText = `Level ${level} - ${difficultyDisplay}`
}

function clearCurrentSequence() {
    const testContainer = document.getElementById('currentTest')
    testContainer.innerText = ''
}

//make sure to clear old user input before rendering next level
function clearUserInput() {
    const userAnswer = document.getElementById('userAnswer')
    userAnswer.value = ''
}

//allow user to get a hint as to what the pattern is about
function displayHint() {
    const hintContainer = document.getElementById('hint')
    //grab the pattern from the database variables
    hintContainer.innerText = levelsDatabase[`${currentDifficulty}Levels`][level].pattern
}

function clearHint() {
    const hintContainer = document.getElementById('hint')
    hintContainer.innerText = ''
}

function showAnswerResult(result) {
   const answerResult = document.getElementById('answerResult')
   answerResult.innerText = result
}

function clearAnswerResult() {
    const answerResult = document.getElementById('answerResult')
    answerResult.innerText = ''
}

function hideAnswerItemsDisplay() {
    document.getElementById('userAnswer').classList.add('hidden')
    document.getElementById('answerButtonsContainer').classList.add('hidden')
}

function displayAnswerItemsDisplay() {
    document.getElementById('userAnswer').classList.remove('hidden')
    document.getElementById('answerButtonsContainer').classList.remove('hidden')
}


//if user answer is correct, incriment the level and display correct and wait a second or so before generating the next test

//if incorrect, reset the level and end the test. show the difficulty buttons again so the user can start another test
function evaluateUserAnswer() {
    const userAnswer = document.getElementById('userAnswer').value
    if(userAnswer == correctAnswer) {
        updateCurrentUserScore(currentUserScore + 1)
        displayCurrentUserScore(currentUserScore)
        updateAndDisplayHighScore()
        showAnswerResult('CORRECT! Loading next level...')
        //remove clicks for answer and click buttons temporarily
        removeAnswerButtonClick()
        removeHintButtonClick()
        clearHint()
        //wait short period of time before clearing and loading next level
        setTimeout(() => {
            level++
            clearCurrentSequence()
            clearUserInput()
            clearAnswerResult()
            loadCurrentLevel(currentDifficulty)
            //add click functionality back with a delay
            allowAnswerButtonClick()
            allowHintButtonClick()
        }, 1500)
    }else {
        clearCurrentSequence()
        hideAnswerItemsDisplay()
        clearHint()
        addNewNumberSequenceTestScore(currentDifficulty)
        updateHighScore(currentDifficulty)
        updateCurrentUserScore(0)
        displayCurrentUserScore(currentUserScore)
        showTestContainerButtonDisplay()
        showAnswerResult(`INCORRECT. You reached level ${level} (${currentDifficulty}).`)
        level = 1
        //here is one spot where the user's scores can be updated in MongoDB
    }
}


function removeAnswerButtonClick() {
    document.getElementById('submitAnswerButton').removeEventListener('click', evaluateUserAnswer)
}

function removeHintButtonClick() {
    document.getElementById('hintButton').removeEventListener('click', displayHint)
}

function allowAnswerButtonClick() {
    document.getElementById('submitAnswerButton').addEventListener('click', evaluateUserAnswer)
}

function allowHintButtonClick() {
    document.getElementById('hintButton').addEventListener('click', displayHint)
}

function updateCurrentUserScore(number) {
    currentUserScore = number
}

function updateAndDisplayHighScore() {
    if(currentUserScore > highScore) {
        highScore = currentUserScore
        document.querySelector('.highScore span').innerText = highScore
    }
}

function displayCurrentUserScore(number) {
    document.querySelector('.currentScore span').innerText = number
}


//reuse the three functions below from recall.js for when it's time to update the NumberSequenceTest db

function addNewNumberSequenceTestScore(currentDifficulty) {
    fetch(`/NumberSequenceTests/addNewNumberSequenceTestScore/${currentDifficulty}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        newScore: currentUserScore
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(`error ${err}`)
    })
  }


  function updateHighScore(currentDifficulty) {
    fetch(`/numberSequenceTests/updateNumberSequenceTestHighScore/${currentDifficulty}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        highScore: highScore
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(`error ${err}`)
    })
  }

function fetchHighScore(currentDifficulty) {
    const difficultyDisplay = currentDifficulty.slice(0,1).toUpperCase() + currentDifficulty.slice(1)
    fetch('/numberSequenceTests/getnumberSequenceTestScore/', {
        method: 'get',
      })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
            console.log(data)
            //update high score variable, make sure it is a number
            highScore = data.numberSequenceTest[`${currentDifficulty}HighScore`]
            console.log(highScore)
            //update the DOM with High Score here:
            document.querySelector('.highScore').innerHTML = `High Score (${difficultyDisplay}): <span>${highScore}</span>`
        })
        .catch(err => {
          console.log(`error ${err}`)
      })
}





//all of the predefined tests for each difficulty
const levelsDatabase = {
    easyLevels: {
        1: { pattern: "Arithmetic Progression", sequence: [2, 4, 6, 8, 10] },
        2: { pattern: "Geometric Progression", sequence: [3, 6, 12, 24, 48] },
        3: { pattern: "Odd Numbers", sequence: [1, 3, 5, 7, 9] },
        4: { pattern: "Even Numbers", sequence: [2, 4, 6, 8, 10] },
        5: { pattern: "Squares of Natural Numbers", sequence: [1, 4, 9, 16, 25] },
        6: { pattern: "Cubes of Natural Numbers", sequence: [1, 8, 27, 64, 125] },
        7: { pattern: "Descending Order", sequence: [10, 9, 8, 7, 6] },
        8: { pattern: "Single Digit Addition", sequence: [1, 2, 3, 4, 5] },
        9: { pattern: "Powers of 2", sequence: [2, 4, 8, 16, 32] },
        10: { pattern: "Triangular Numbers", sequence: [1, 3, 6, 10, 15] },
        11: { pattern: "Repeating Pattern", sequence: [1, 2, 1, 2, 1] },
        12: { pattern: "Double the Previous", sequence: [1, 2, 4, 8, 16] },
        13: { pattern: "Add Alternately", sequence: [1, 3, 4, 6, 7] },
        14: { pattern: "Subtract by 1", sequence: [5, 4, 3, 2, 1] },
        15: { pattern: "Prime Numbers", sequence: [2, 3, 5, 7, 11] },
        16: { pattern: "Digits in Ascending Order", sequence: [1, 12, 123, 1234] },
        17: { pattern: "Skip One", sequence: [2, 4, 6, 8, 10] },
        18: { pattern: "Small Increment", sequence: [1, 2, 3, 4, 5, 6] },
        19: { pattern: "Single Digit Multiples", sequence: [3, 6, 9, 12, 15] },
        20: { pattern: "Add and Repeat", sequence: [2, 2, 4, 4, 6, 6] },
    },
    mediumLevels: {
        1: { pattern: "Fibonacci Sequence", sequence: [0, 1, 1, 2, 3, 5, 8] },
        2: { pattern: "Double and Add 1", sequence: [1, 3, 7, 15, 31] },
        3: { pattern: "Reverse Digits", sequence: [21, 12, 32, 23, 43] },
        4: { pattern: "Squares of Odd Numbers", sequence: [1, 9, 25, 49, 81] },
        5: { pattern: "Odd and Even Alternating", sequence: [1, 2, 3, 4, 5, 6] },
        6: { pattern: "Multiply by 3", sequence: [1, 3, 9, 27, 81] },
        7: { pattern: "Prime Numbers Skipping 1", sequence: [2, 5, 11, 17, 23] },
        8: { pattern: "Factorials", sequence: [1, 2, 6, 24, 120] },
        9: { pattern: "Powers of 3", sequence: [3, 9, 27, 81, 243] },
        10: { pattern: "Alternating Signs", sequence: [1, -1, 2, -2, 3, -3] },
        11: { pattern: "Double Digits Descending", sequence: [20, 18, 16, 14, 12] },
        12: { pattern: "Geometric with Fraction", sequence: [1, 0.5, 0.25, 0.125, 0.0625] },
        13: { pattern: "Cubed Roots", sequence: [1, 8, 27, 64, 125] },
        14: { pattern: "Sum of Digits", sequence: [1, 2, 3, 6, 9, 15] },
        15: { pattern: "Increment by 3", sequence: [1, 4, 7, 10, 13] },
        16: { pattern: "Subtract Alternately", sequence: [10, 9, 7, 6, 4] },
        17: { pattern: "Ascending Pairs", sequence: [1, 12, 123, 1234] },
        18: { pattern: "Descending Pairs", sequence: [321, 32, 3, 1] },
        19: { pattern: "Multiply Alternately", sequence: [2, 4, 8, 16, 32] },
        20: { pattern: "Odd Numbers Descending", sequence: [19, 17, 15, 13, 11] },
    },
    hardLevels: {
        1: { pattern: "Custom Sequence 1", sequence: [5, 10, 25, 50, 100] },
        2: { pattern: "Complex Fibonacci", sequence: [2, 2, 4, 6, 10, 16] },
        3: { pattern: "Geometric Decreasing", sequence: [50, 25, 12.5, 6.25] },
        4: { pattern: "Alternating Cubes", sequence: [1, 8, 1, 27, 1] },
        5: { pattern: "Reverse Primes", sequence: [101, 71, 61, 31] },
        6: { pattern: "Add 5, Multiply 2", sequence: [1, 6, 12, 17, 34] },
        7: { pattern: "Squares Skipping 1", sequence: [1, 4, 16, 36, 64] },
        8: { pattern: "Odd Numbers Cubed", sequence: [1, 27, 125, 343, 729] },
        9: { pattern: "Alternating Double and Halve", sequence: [2, 4, 2, 8, 4] },
        10: { pattern: "Negative Descending Primes", sequence: [-2, -3, -5, -7, -11] },
        11: { pattern: "Factorials Alternating Signs", sequence: [1, -2, 6, -24, 120] },
        12: { pattern: "Increasing Powers of 2", sequence: [1, 2, 4, 8, 16, 32] },
        13: { pattern: "Incrementing by Multiples", sequence: [1, 2, 4, 8, 16, 32] },
        14: { pattern: "Prime Plus Squares", sequence: [3, 9, 19, 33, 51] },
        15: { pattern: "Triple Digits Descending", sequence: [999, 888, 777, 666, 555] },
        16: { pattern: "Mirror Digits", sequence: [121, 232, 343, 454, 565] },
        17: { pattern: "Custom Alternates", sequence: [2, 3, 6, 4, 8, 9] },
        18: { pattern: "Skip-Multiples", sequence: [1, 2, 4, 8] },
        19: { pattern: "Odd Numbers Alternating Signs", sequence: [1, -3, 5, -7, 9, -11] },
        20: { pattern: "Descending Odds Cubed", sequence: [1331, 729, 343, 125, 27] }
    },
    expertLevels: {
        1: { pattern: "Prime Factorials", sequence: [2, 6, 30, 210, 2310] },
        2: { pattern: "Additive Fibonacci", sequence: [1, 1, 2, 4, 7, 13] },
        3: { pattern: "Square Root Progression", sequence: [1, 1.41, 1.73, 2, 2.24] },
        4: { pattern: "Powers of 2 Minus 1", sequence: [1, 3, 7, 15, 31] },
        5: { pattern: "Alternating Squares and Halves", sequence: [4, 16, 8, 36, 18, 64] },
        6: { pattern: "Multiply and Subtract", sequence: [2, 6, 11, 16, 31] },
        7: { pattern: "Add Primes", sequence: [2, 5, 10, 17, 28] },
        8: { pattern: "Reverse Alternating Evens", sequence: [18, 16, 14, 12, 10, 8] },
        9: { pattern: "Prime Numbers x2", sequence: [2, 6, 10, 14, 18] },
        10: { pattern: "Halve Then Add Fibonacci", sequence: [100, 50, 51, 25.5, 26.5, 13.25, 14.25] },
        11: { pattern: "Prime Numbers Squared", sequence: [4, 9, 25, 49, 121] },
        12: { pattern: "Double Add Five", sequence: [2, 9, 23, 51, 107] },
        13: { pattern: "Alternating Primes and Evens", sequence: [2, 3, 4, 5, 6, 7] },
        14: { pattern: "Reverse Fibonacci", sequence: [21, 13, 8, 5, 3, 2] },
        15: { pattern: "Cube Roots Rounded", sequence: [1, 2, 3, 4, 5] },
        16: { pattern: "Subtraction by Descending Odd Numbers", sequence: [50, 49, 47, 44, 40] },
        17: { pattern: "Add 7, Subtract Fibonacci", sequence: [1, 8, 6, 15, 9] },
        18: { pattern: "Square and Add Alternating", sequence: [1, 4, 5, 25, 30] },
        19: { pattern: "Prime x2, Skip 1", sequence: [2, 6, 18, 38, 62] },
        20: { pattern: "Reverse Digits", sequence: [123, 321, 234, 432, 345] }
    },
    impossibleLevels: {
        1: { pattern: "Squares of Primes Alternating", sequence: [4, 9, 25, 49, 121, 169] },
        2: { pattern: "Fibonacci Cubes", sequence: [1, 1, 8, 27, 125] },
        3: { pattern: "Triple Add Primes", sequence: [2, 5, 11, 19, 31, 47] },
        4: { pattern: "Prime Factorials Reverse", sequence: [120, 24, 6, 2] },
        5: { pattern: "Alternating Halves and Primes", sequence: [64, 32, 17, 8, 4, 3] },
        6: { pattern: "Fibonacci Alternating Addition", sequence: [1, 2, 4, 7, 12, 20] },
        7: { pattern: "Square Roots Reversed", sequence: [36, 6, 25, 5, 16, 4] },
        8: { pattern: "Primes Multiplicative Series", sequence: [2, 6, 30, 210, 2310] },
        9: { pattern: "Alternating Digits Backwards", sequence: [1234, 4321, 5678, 8765] },
        10: { pattern: "Cubes Minus Primes", sequence: [1, 6, 24, 54, 119] },
        11: { pattern: "Double Add Fibonacci", sequence: [1, 2, 5, 9, 15, 24] },
        12: { pattern: "Complex Add & Multiply", sequence: [1, 3, 7, 21, 65] },
        13: { pattern: "Cumulative Sums of Primes", sequence: [2, 5, 10, 17, 28] },
        14: { pattern: "Halve Plus One", sequence: [64, 33, 17, 9, 5] },
        15: { pattern: "Mixed Multiples of Fibonacci", sequence: [1, 3, 9, 15, 36] },
        16: { pattern: "Reverse Arithmetic Primes", sequence: [2, 5, 3, 7, 11] },
        17: { pattern: "Squares Backward and Prime Cubes", sequence: [64, 9, 27, 81] },
        18: { pattern: "Reversed Alternating Digits", sequence: [432, 234, 123, 321] },
        19: { pattern: "Sum of Alternating Powers", sequence: [1, 4, 9, 16, 25, 49] },
        20: { pattern: "Odd Squares, Then Primes", sequence: [9, 25, 49, 2, 3, 5, 7] }
    }
};