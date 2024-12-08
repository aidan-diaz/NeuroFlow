const express = require("express");
const router = express.Router();
const recallTestsController = require("../controllers/recallTests");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Recall Tests Routes

router.get("/getActiveRecallTest", ensureAuth, recallTestsController.getActiveRecallTest)
router.put("/addNewRecallTestScore/easy", recallTestsController.addEasyScore)
router.put("/addNewRecallTestScore/medium", recallTestsController.addMediumScore)
router.put("/addNewRecallTestScore/hard", recallTestsController.addHardScore)
router.put("/addNewRecallTestScore/expert", recallTestsController.addExpertScore)
router.put("/addNewRecallTestScore/impossible", recallTestsController.addImpossibleScore)

//GET HIGH SCORES TO RENDER WITH EJS
router.get("/getRecallTestScore", recallTestsController.getRecallTestHighScores)

router.put("/updateRecallTestHighScore/easy", recallTestsController.updateRecallTestEasyHighScore)
router.put("/updateRecallTestHighScore/medium", recallTestsController.updateRecallTestMediumHighScore)
router.put("/updateRecallTestHighScore/hard", recallTestsController.updateRecallTestHardHighScore)
router.put("/updateRecallTestHighScore/expert", recallTestsController.updateRecallTestExpertHighScore)
router.put("/updateRecallTestHighScore/impossible", recallTestsController.updateRecallTestImpossibleHighScore)
router.delete("/deleteRecallTestScore/:id", recallTestsController.deleteRecallTestScores)


module.exports = router;