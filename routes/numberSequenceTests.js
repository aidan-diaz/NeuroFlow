const express = require("express");
const router = express.Router();
const numberSequenceTestsController = require("../controllers/numberSequenceTests");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Number Sequence Tests Routes

router.get("/getNumberSequenceTest", ensureAuth, numberSequenceTestsController.getNumberSequenceTest)

router.put("/addNewNumberSequenceTestScore/easy", numberSequenceTestsController.addEasyScore)
router.put("/addNewNumberSequenceTestScore/medium", numberSequenceTestsController.addMediumScore)
router.put("/addNewNumberSequenceTestScore/hard", numberSequenceTestsController.addHardScore)
router.put("/addNewNumberSequenceTestScore/expert", numberSequenceTestsController.addExpertScore)
router.put("/addNewNumberSequenceTestScore/impossible", numberSequenceTestsController.addImpossibleScore)

// //GET HIGH SCORES TO RENDER WITH EJS
router.get("/getNumberSequenceTestScore", numberSequenceTestsController.getNumberSequenceTestHighScores)

router.put("/updateNumberSequenceTestHighScore/easy", numberSequenceTestsController.updateNumberSequenceTestEasyHighScore)
router.put("/updateNumberSequenceTestHighScore/medium", numberSequenceTestsController.updateNumberSequenceTestMediumHighScore)
router.put("/updateNumberSequenceTestHighScore/hard", numberSequenceTestsController.updateNumberSequenceTestHardHighScore)
router.put("/updateNumberSequenceTestHighScore/expert", numberSequenceTestsController.updateNumberSequenceTestExpertHighScore)
router.put("/updateNumberSequenceTestHighScore/impossible", numberSequenceTestsController.updateNumberSequenceTestImpossibleHighScore)


router.delete("/deleteNumberSequenceTestScore/:id", numberSequenceTestsController.deleteNumberSequenceTestScores)


module.exports = router;