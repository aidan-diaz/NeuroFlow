const express = require("express");
const router = express.Router();
const reactionTestsController = require("../controllers/reactionTests");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Reaction Tests Routes

router.get("/getReactionTest", ensureAuth, reactionTestsController.getReactionTest)
router.post("/createReactionTest", reactionTestsController.createReactionTestScores)
router.put("/updateReactionTestHighScore", reactionTestsController.updateReactionTestHighScore)
router.put("/addNewReactionGameScore", reactionTestsController.addNewReactionGameScore)
router.delete("/deleteReactionTestScore/:id", reactionTestsController.deleteReactionTestScores)

module.exports = router;
