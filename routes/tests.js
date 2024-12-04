const express = require("express");
const router = express.Router();
const testsController = require("../controllers/tests");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Reaction Tests Routes

router.get("/getReactionTest", ensureAuth, testsController.getReactionTest)
router.post("/createReactionTest", testsController.createReactionTestScores)
router.put("/updateReactionTestHighScore", testsController.updateReactionTestHighScore)
router.put("/addNewReactionGameScore", testsController.addNewReactionGameScore)
router.delete("/deleteReactionTestScore/:id", testsController.deleteReactionTestScores)

module.exports = router;
