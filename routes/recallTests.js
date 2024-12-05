const express = require("express");
const router = express.Router();
const recallTestsController = require("../controllers/recallTests");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Recall Tests Routes

// router.get("/getReactionTest", ensureAuth, testsController.getReactionTest)
// router.post("/createReactionTest", testsController.createReactionTestScores)
// router.put("/updateReactionTestHighScore", testsController.updateReactionTestHighScore)
// router.put("/addNewReactionGameScore", testsController.addNewReactionGameScore)
// router.delete("/deleteReactionTestScore/:id", testsController.deleteReactionTestScores)

router.get("/getActiveRecallTest", ensureAuth, recallTestsController.getActiveRecallTest)

module.exports = router;