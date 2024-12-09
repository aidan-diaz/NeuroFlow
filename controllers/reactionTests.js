const ReactionTest = require("../models/ReactionTest");

module.exports = {
  getReactionTest: async (req, res) => {
    try {
      let test = await ReactionTest.find({ user: req.user.id });
      if(test.length) {
        res.render("reaction.ejs", { user: req.user, scores: test });
      }else {
        const reactionTest = new ReactionTest({
          user: req.user.id,
          scores: [],
          highScore: 0,
        });
    
        await reactionTest.save();
        test = await ReactionTest.find({ user: req.user.id });
        res.render("reaction.ejs", { user: req.user, scores: test });
      }

      
    } catch (err) {
      console.log(err);
    }
  },
  createReactionTestScores: async (req, res) => {
    try {

      await ReactionTest.create({
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
      await ReactionTest.findOneAndUpdate(
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
      await ReactionTest.findOneAndUpdate(
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
      await ReactionTest.findOneAndDelete({_id: req.params.id});
      console.log("Deleted Reaction Test Scores");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
