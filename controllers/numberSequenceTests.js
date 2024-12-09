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
      addEasyScore: async (req, res) => {
        try {
          await NumberSequenceTest.findOneAndUpdate(
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
          await NumberSequenceTest.findOneAndUpdate(
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
          await NumberSequenceTest.findOneAndUpdate(
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
          await NumberSequenceTest.findOneAndUpdate(
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
          await NumberSequenceTest.findOneAndUpdate(
            { user: req.user.id },
            {
              $push: { impossibleScores: req.body.newScore },
            }
          );
    
        } catch (err) {
          console.log(err);
        }
      }, 
      getNumberSequenceTestHighScores: async (req, res) => {
        try {
          const numberSequenceTest = await NumberSequenceTest.findOne({ user: req.user.id });
          res.json({ numberSequenceTest: numberSequenceTest });
        } catch (err) {
          console.log(err);
        }
      },
      updateNumberSequenceTestEasyHighScore: async (req, res) => {
        try {
          await NumberSequenceTest.findOneAndUpdate(
            { user: req.user.id },
            {
              $set: { easyHighScore: req.body.highScore },
            }
          );
        } catch (err) {
          console.log(err);
        }
      },
      updateNumberSequenceTestMediumHighScore: async (req, res) => {
        try {
          await NumberSequenceTest.findOneAndUpdate(
            { user: req.user.id },
            {
              $set: { mediumHighScore: req.body.highScore },
            }
          );
    
        } catch (err) {
          console.log(err);
        }
      },
      updateNumberSequenceTestHardHighScore: async (req, res) => {
        try {
          await NumberSequenceTest.findOneAndUpdate(
            { user: req.user.id },
            {
              $set: { hardHighScore: req.body.highScore },
            }
          );
    
        } catch (err) {
          console.log(err);
        }
      },
      updateNumberSequenceTestExpertHighScore: async (req, res) => {
        try {
          await NumberSequenceTest.findOneAndUpdate(
            { user: req.user.id },
            {
              $set: { expertHighScore: req.body.highScore },
            }
          );
    
        } catch (err) {
          console.log(err);
        }
      },
      updateNumberSequenceTestImpossibleHighScore: async (req, res) => {
        try {
          await NumberSequenceTest.findOneAndUpdate(
            { user: req.user.id },
            {
              $set: { impossibleHighScore: req.body.highScore },
            }
          );
    
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

