document.querySelector('#startTestButton').addEventListener('click', displayTestScreen)
document.querySelector('#startTestButton').addEventListener('click', hideInstructionsScreen)
const shapeContainer = document.getElementById("shape-container")
const message = document.getElementById("message")
const buttonContainer = document.getElementById('button-container')
//array that will hold the current sequence from test
let testSequence = []
//array that will hold player's answer
let playerSequence = []
let level = 0
let currentUserScore = 0
//eventually switch high score to be whatever is stored in user document from DB
let highScore = 0
let sequencePlaying = false


// Hardcoded shape pools
const shapePools = {
    easy: ["bi-triangle-fill", "bi-circle-fill", "bi-square-fill"],
    medium: ["bi-triangle-fill", "bi-circle-fill", "bi-square-fill", "bi-heart-fill"],
    hard: ["bi-triangle-fill", "bi-circle-fill", "bi-square-fill", "bi-heart-fill", "bi-star-fill"],
    expert: ["bi-triangle-fill", "bi-circle-fill", "bi-square-fill", "bi-heart-fill", "bi-star-fill", "bi-pentagon-fill"],
    impossible: ["bi-triangle-fill", "bi-circle-fill", "bi-square-fill", "bi-heart-fill", "bi-star-fill", "bi-pentagon-fill", "bi-hexagon-fill"]
}
// Active shape pool for the current test
let currentShapePool = []

//difficulty is being passed in from on click functions in the EJS
function startTest(difficulty) {
    //hide the buttons so the user cannot end the current test and start a different one in the middle of it
    toggleTestButtons()
    //set everything back to its default from page load
    resetTest()
    // Set the shape pool based on the selected difficulty - ex: shapePools['easy'] will give the array in the easy property
    setCurrentShapePool(difficulty)
    //start round
    nextRound()
}

function nextRound() {
    //level by default on reset is 0 - this will change it to 1, or whatever the current level is +1
    updateLevel(level + 1)
    //show the level to the user at the top
    displayCurrentLevel()
    //prevents user from clicking answer until sequence finishes showing
    updateSequencePlaying(true)
    //make sure the player sequence is empty at start of each round
    resetPlayerSequence()
    //Add a random shape to the sequence (shapes can repeat)
    const nextShape = generateShape()
    //put the random shape into the current Test sequence
    testSequence.push(nextShape)
    updateMessageDisplay(`Level ${level}: Watch the sequence!`)
    //show each shape from the current test sequence one at a time
    playSequence()
}

function generateShape() {
    //grabs a random index from shape pool and return it
    const randomIndex = Math.floor(Math.random() * currentShapePool.length)
    return currentShapePool[randomIndex]
}

function playSequence() {
    let delay = 0
    testSequence.forEach( shape => {
        // Show the shape
        setTimeout(() => {
            //this is where each shape is shown 1 by 1
            displayShape(shape)
        }, delay)
        //Add a pause after the shape disappears
        //Time for the shape to show
        delay += 1000 
        setTimeout(() => {
            //Clear the container between flashes
            hideShapes()
            //Midway before the next shape shows
        }, delay - 500) 
    });

    setTimeout(() => {
        updateMessageDisplay("Your turn!")
        //Display the shapes for the user to click
        displayAnswerKey()
        //change boolean to indicate that sequence is no longer playing, allowing shapes to be clicked 
        updateSequencePlaying(false)
    }, delay)
}


function displayShape(iconClass) {
    hideShapes()
    const shapeElement = createShapeElement(iconClass)
    shapeContainer.appendChild(shapeElement)
}

function createShapeElement(iconClass) {
    const shapeElement = document.createElement("i")
    shapeElement.classList.add("shape", iconClass)
    return shapeElement;
}

function hideShapes() {
    shapeContainer.innerHTML = ""
}

function displayAnswerKey() {
    //clear the old display
    hideShapes()
    //for each shape in the current shape pool array, ensure that the shape can be clicked
    currentShapePool.forEach(iconClass => {
        //creates an i tag with the classes "shape" and whatever the icon class from the shape pool array is
        const shapeElement = createShapeElement(iconClass)
        shapeElement.addEventListener("click", () => handlePlayerInput(iconClass))
        shapeContainer.appendChild(shapeElement)
    });
}

function resetTest() {
    resetTestSequence()
    resetPlayerSequence()
    updateLevel(0)
    updateCurrentUserScore(0)
    displayCurrentScore()
    updateMessageDisplay("")
    hideShapes()
}

function handlePlayerInput(iconClass) {
    //prevents user from clicking shapes while the sequence is flashing
    if (sequencePlaying) return
    //if the sequence is not flashing, allow the user to click on a shape to add it to their answer
    playerSequence.push(iconClass)
    //defines the most recently clicked shape
    const currentStep = playerSequence.length - 1
    // Compare the player's most recently clicked shape to the corresponding indexed shape in the Test sequence
    if (playerSequence[currentStep] !== testSequence[currentStep]) {
        updateMessageDisplay(`Wrong! Test over. You reached level ${level}.`)
        updateCurrentUserScore(0)
        displayCurrentScore()
        //change sequence playing back to true to prevent more clicks
        updateSequencePlaying(true)
        //make the test difficulty buttons available again
        toggleTestButtons()
        //if the guess is wrong, exit the function
        return
    }
    // If the player completes the sequence correctly
    if (playerSequence.length === testSequence.length) {
        hideShapes()
        updateMessageDisplay("Correct! Get ready for the next round!")
        //changed sequence playing to true immediately after getting answer correct to prevent more clicks prior to showing new sequence
        updateCurrentUserScore(currentUserScore + 1)
        displayCurrentScore()
        updateAndDisplayHighScore()
        updateSequencePlaying(true)
        setTimeout(nextRound, 1000)
    }
}

function setCurrentShapePool(difficulty) {
    currentShapePool = shapePools[difficulty]
}

function updateAndDisplayHighScore() {
    if(currentUserScore > highScore) {
        highScore = currentUserScore
        document.querySelector('.highScore span').innerText = highScore
    }
}

function displayCurrentScore() {
    document.querySelector('.currentScore span').innerText = currentUserScore
}

function displayCurrentLevel() {
    document.querySelector('.currentLevel span').innerText = level
}

function updateSequencePlaying(boolean) {
    sequencePlaying = boolean
}

function updateMessageDisplay(messageText) {
    message.innerText = messageText
}

function updateCurrentUserScore(number) {
    currentUserScore = number
}

function updateLevel(number) {
    level = number
}

function resetTestSequence() {
    testSequence = []
}

function resetPlayerSequence() {
    playerSequence = []
}

function toggleTestButtons() {
    buttonContainer.classList.toggle('hidden')
}

//able to click again after success text displays, try to fix that - DONE
//add hover feature when user hovers over answer options
//add a feature to show remaining clicks
//add a scoreboard - DONE
//add a high score - DONE
//consider hiding the buttons for the different rounds. Only display them again when the user loses. - DONE
//does not look great on mobile currently, go back and fix for mobile


const shapes = document.querySelectorAll('.shapes .shape')

function displayTestScreen() {
    document.querySelector('main').classList.remove('hidden')
}

function hideInstructionsScreen() {
    document.getElementById('instructionsContainer').classList.add('hidden')
}


// - Need to either make new schema for active recall test scores or add the key value pairs to the schema for the reaction test scores

// - Need to possibly make another schema for the predefined active recall test sequences

// - When a user goes to the recall page, they should see instructions with how to take the test, and a start button

// - When user clicks the start button, the first test should load

// - The test should flash 3-7 shapes (depends on how many are in the test), and the user will then have to click on the shapes in the order in which they appeared

// - the shapes that are flashed will have values that push to a sequence array

// - after the sequence disappears, one of each shape will appear, and the user will be able to click on them one by one to form their answer (each part of the answer will be pushed to an array)

// - once the answer array's length matches the sequence array's length, a check will be performed to see if they match

// - If the user's answer matches the order in which the shapes appear, the user may proceed to the next level

// - Otherwise, the test will end

// - When the test ends, the user's current score will be pushed to the array of scores from their recallScores document

// - If their current score exceeded the high score that they had saved, the highScore in the document will be replaced with the current score 

