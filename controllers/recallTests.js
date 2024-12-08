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
  addEasyScore: async (req, res) => {
    try {
      await RecallTest.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: { easyScores: req.body.newScore },
        }
      );

    } catch (err) {
      console.log(err);
    }
  },
  addMediumScore: async (req, res) => {
    try {
      console.log('working')
      await RecallTest.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: { mediumScores: req.body.newScore },
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
  addHardScore: async (req, res) => {
    try {
      await RecallTest.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: { hardScores: req.body.newScore },
        }
      );

    } catch (err) {
      console.log(err);
    }
  },
  addExpertScore: async (req, res) => {
    try {
      await RecallTest.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: { expertScores: req.body.newScore },
        }
      );

    } catch (err) {
      console.log(err);
    }
  },
  addImpossibleScore: async (req, res) => {
    try {
      await RecallTest.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: { impossibleScores: req.body.newScore },
        }
      );

    } catch (err) {
      console.log(err);
    }
  },
  
  getRecallTestHighScores: async (req, res) => {
    try {
      const recallTest = await RecallTest.findOne({ user: req.user.id });
      res.json({ recallTest: recallTest });
    } catch (err) {
      console.log(err);
    }
  },


  updateRecallTestEasyHighScore: async (req, res) => {
    try {
      await RecallTest.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: { easyHighScore: req.body.highScore },
        }
      );

    } catch (err) {
      console.log(err);
    }
  },
  updateRecallTestMediumHighScore: async (req, res) => {
    try {
      await RecallTest.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: { mediumHighScore: req.body.highScore },
        }
      );

    } catch (err) {
      console.log(err);
    }
  },
  updateRecallTestHardHighScore: async (req, res) => {
    try {
      await RecallTest.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: { hardHighScore: req.body.highScore },
        }
      );

    } catch (err) {
      console.log(err);
    }
  },
  updateRecallTestExpertHighScore: async (req, res) => {
    try {
      await RecallTest.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: { expertHighScore: req.body.highScore },
        }
      );

    } catch (err) {
      console.log(err);
    }
  },
  updateRecallTestImpossibleHighScore: async (req, res) => {
    try {
      await RecallTest.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: { impossibleHighScore: req.body.highScore },
        }
      );

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

