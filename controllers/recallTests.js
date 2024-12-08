const RecallTest = require("../models/RecallTest");

module.exports = {

  getActiveRecallTest: async (req, res) => {
    try {
      let test = await RecallTest.find({ user: req.user.id });
      if (test.length) {
        res.render("recall.ejs", { user: req.user, scores: test });
      } else {
        const recallTest = new RecallTest({
          user: req.user.id,
          easyScores: [],
          easyHighScore: 0,
          mediumScores: [],
          mediumHighScore: 0,
          hardScores: [],
          hardHighScore: 0,
          expertScores: [],
          expertHighScore: 0,
          impossibleScores: [],
          impossibleHighScore: 0
        });

        await recallTest.save();
        test = await RecallTest.find({ user: req.user.id });
        res.render("recall.ejs", { user: req.user, scores: test });
      }
    } catch (err) {
      console.log(err);
    }
  },
  deleteRecallTestScores: async (req, res) => {
    try {
      await RecallTest.findOneAndDelete({_id: req.params.id});
      console.log("Deleted Recall Test Scores");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};

