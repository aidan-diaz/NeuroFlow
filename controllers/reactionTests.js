const Test = require("../models/ReactionTest");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const tests = await Test.find({ user: req.user.id });
      res.render("profile.ejs", { user: req.user, scores: tests });
    } catch (err) {
      console.log(err);
    }
  },
  getReactionTest: async (req, res) => {
    try {
      const test = await Test.find({ user: req.user.id });
      res.render("reaction.ejs", { user: req.user, scores: test });
    } catch (err) {
      console.log(err);
    }
  },
  createReactionTestScores: async (req, res) => {
    try {

      await Test.create({
        user: req.user.id,
        scores: [],
        highScore: 0,
      });
      console.log("Test array has been added.");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  addNewReactionGameScore: async (req, res) => {
    try {
      await Test.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: { scores: req.body.newScore },
        }
      );

    } catch (err) {
      console.log(err);
    }
  },
  updateReactionTestHighScore: async (req, res) => {
    try {
      await Test.findOneAndUpdate(
        { user: req.user.id },
        {
          $set: { highScore: req.body.highScore },
        }
      );

    } catch (err) {
      console.log(err);
    }
  },
  deleteReactionTestScores: async (req, res) => {
    try {
      await Test.findOneAndDelete({_id: req.params.id});
      console.log("Deleted Reaction Test Scores");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
