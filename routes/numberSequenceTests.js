const express = require("express");
const router = express.Router();
const numberSequenceTestsController = require("../controllers/numberSequenceTests");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Number Sequence Tests Routes

router.get("/getNumberSequenceTest", ensureAuth, numberSequenceTestsController.getNumberSequenceTest)
router.delete("/deleteNumberSequenceTestScore/:id", numberSequenceTestsController.deleteNumberSequenceTestScores)
// router.post("/createReactionTest", reactionTestsController.createReactionTestScores)
// router.put("/updateReactionTestHighScore", reactionTestsController.updateReactionTestHighScore)
// router.put("/addNewReactionTestScore", reactionTestsController.addNewReactionGameScore)
// router.delete("/deleteReactionTestScore/:id", reactionTestsController.deleteReactionTestScores)

module.exports = router;