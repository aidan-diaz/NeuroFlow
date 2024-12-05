// - Need to either make new schema for active recall test scores or add the key value pairs to the schema for the reaction test scores

// - Need to possibly make another schema for the predefined active recall test sequences

// - When a user goes to the recall page, they should see instructions with how to take the test, and a start button

// - When user clicks the start button, the first test should load

// - The test should flash 3-9 shapes (depends on how many are in the test), and the user will then have to click on the shapes in the order in which they appeared

// - the shapes that are flashed will have values that push to a sequence array

// - after the sequence disappears, one of each shape will appear, and the user will be able to click on them one by one to form their answer (each part of the answer will be pushed to an array)

// - once the answer array's length matches the sequence array's length, a check will be performed to see if they match

// - If the user's answer matches the order in which the shapes appear, the user may proceed to the next level

// - Otherwise, the test will end

// - When the test ends, the user's current score will be pushed to the array of scores from their recallScores document

// - If their current score exceeded the high score that they had saved, the highScore in the document will be replaced with the current score 

// [
//   // 10 tests with 3 shapes
//   { "name": "test_1", "sequence": ["triangle", "circle", "square"] },
//   { "name": "test_2", "sequence": ["heart", "square", "circle"] },
//   { "name": "test_3", "sequence": ["hexagon", "pentagon", "triangle"] },
//   { "name": "test_4", "sequence": ["star", "circle", "heart"] },
//   { "name": "test_5", "sequence": ["pentagon", "triangle", "square"] },
//   { "name": "test_6", "sequence": ["circle", "hexagon", "star"] },
//   { "name": "test_7", "sequence": ["heart", "square", "hexagon"] },
//   { "name": "test_8", "sequence": ["triangle", "pentagon", "circle"] },
//   { "name": "test_9", "sequence": ["square", "heart", "star"] },
//   { "name": "test_10", "sequence": ["hexagon", "circle", "triangle"] },

//   // 10 tests with 4 shapes
//   { "name": "test_11", "sequence": ["triangle", "square", "circle", "heart"] },
//   { "name": "test_12", "sequence": ["pentagon", "triangle", "star", "hexagon"] },
//   { "name": "test_13", "sequence": ["circle", "square", "pentagon", "star"] },
//   { "name": "test_14", "sequence": ["hexagon", "heart", "triangle", "square"] },
//   { "name": "test_15", "sequence": ["circle", "star", "heart", "pentagon"] },
//   { "name": "test_16", "sequence": ["triangle", "square", "hexagon", "circle"] },
//   { "name": "test_17", "sequence": ["heart", "triangle", "circle", "pentagon"] },
//   { "name": "test_18", "sequence": ["star", "square", "hexagon", "triangle"] },
//   { "name": "test_19", "sequence": ["circle", "heart", "star", "pentagon"] },
//   { "name": "test_20", "sequence": ["hexagon", "circle", "triangle", "heart"] },

//   // 10 tests with 5 shapes
//   { "name": "test_21", "sequence": ["triangle", "square", "circle", "heart", "pentagon"] },
//   { "name": "test_22", "sequence": ["star", "hexagon", "pentagon", "triangle", "circle"] },
//   { "name": "test_23", "sequence": ["circle", "square", "triangle", "star", "heart"] },
//   { "name": "test_24", "sequence": ["hexagon", "pentagon", "heart", "triangle", "square"] },
//   { "name": "test_25", "sequence": ["circle", "hexagon", "star", "triangle", "heart"] },
//   { "name": "test_26", "sequence": ["square", "pentagon", "circle", "star", "heart"] },
//   { "name": "test_27", "sequence": ["triangle", "circle", "heart", "hexagon", "square"] },
//   { "name": "test_28", "sequence": ["star", "square", "circle", "pentagon", "hexagon"] },
//   { "name": "test_29", "sequence": ["heart", "pentagon", "triangle", "square", "star"] },
//   { "name": "test_30", "sequence": ["circle", "hexagon", "star", "heart", "triangle"] },

//   // 10 tests with 6 shapes
//   { "name": "test_31", "sequence": ["triangle", "circle", "square", "heart", "star", "pentagon"] },
//   { "name": "test_32", "sequence": ["hexagon", "triangle", "square", "pentagon", "star", "circle"] },
//   { "name": "test_33", "sequence": ["circle", "square", "heart", "star", "hexagon", "triangle"] },
//   { "name": "test_34", "sequence": ["pentagon", "hexagon", "triangle", "circle", "square", "heart"] },
//   { "name": "test_35", "sequence": ["hexagon", "circle", "pentagon", "heart", "star", "triangle"] },
//   { "name": "test_36", "sequence": ["triangle", "square", "star", "circle", "heart", "pentagon"] },
//   { "name": "test_37", "sequence": ["circle", "pentagon", "star", "hexagon", "heart", "triangle"] },
//   { "name": "test_38", "sequence": ["hexagon", "circle", "square", "pentagon", "triangle", "star"] },
//   { "name": "test_39", "sequence": ["heart", "triangle", "circle", "star", "pentagon", "square"] },
//   { "name": "test_40", "sequence": ["circle", "star", "hexagon", "square", "triangle", "heart"] },

//   // 10 tests with 7 shapes
//   { "name": "test_41", "sequence": ["triangle", "circle", "square", "heart", "star", "pentagon", "hexagon"] },
//   { "name": "test_42", "sequence": ["heart", "triangle", "square", "circle", "star", "hexagon", "pentagon"] },
//   { "name": "test_43", "sequence": ["pentagon", "hexagon", "heart", "circle", "square", "star", "triangle"] },
//   { "name": "test_44", "sequence": ["circle", "square", "pentagon", "hexagon", "heart", "star", "triangle"] },
//   { "name": "test_45", "sequence": ["hexagon", "triangle", "circle", "pentagon", "square", "star", "heart"] },
//   { "name": "test_46", "sequence": ["triangle", "circle", "heart", "square", "hexagon", "star", "pentagon"] },
//   { "name": "test_47", "sequence": ["circle", "pentagon", "triangle", "hexagon", "heart", "square", "star"] },
//   { "name": "test_48", "sequence": ["hexagon", "triangle", "star", "circle", "heart", "pentagon", "square"] },
//   { "name": "test_49", "sequence": ["heart", "circle", "triangle", "star", "pentagon", "hexagon", "square"] },
//   { "name": "test_50", "sequence": ["square", "hexagon", "circle", "triangle", "pentagon", "heart", "star"] }
// ]