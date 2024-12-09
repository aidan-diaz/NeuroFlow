const NumberSequenceTest = require("../models/NumberSequenceTest");

module.exports = {

    getNumberSequenceTest: async (req, res) => {
        try {
          let test = await NumberSequenceTest.find({ user: req.user.id });
          if (test.length) {
            res.render("numberSequence.ejs", { user: req.user, scores: test });
          } else {
            const numberSequenceTest = new NumberSequenceTest({
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
    
            await numberSequenceTest.save();
            test = await NumberSequenceTest.find({ user: req.user.id });
            res.render("numberSequence.ejs", { user: req.user, scores: test });
          }
        } catch (err) {
          console.log(err);
        }
      },
      deleteNumberSequenceTestScores: async (req, res) => {
        try {
          await NumberSequenceTest.findOneAndDelete({_id: req.params.id});
          console.log("Deleted Number Sequence Test Scores");
          res.redirect("/profile");
        } catch (err) {
          res.redirect("/profile");
        }
      },

}

