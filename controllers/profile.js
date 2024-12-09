const RecallTest = require("../models/RecallTest");
const ReactionTest = require("../models/ReactionTest");
const NumberSequenceTest = require("../models/NumberSequenceTest");

module.exports = {

    getProfile: async (req, res) => {
        try {
          const reactionTest = await ReactionTest.find({ user: req.user.id });
          const recallTest = await RecallTest.find({ user: req.user.id });
          const numberSequenceTest = await NumberSequenceTest.find({ user: req.user.id });
          res.render("profile.ejs", { user: req.user, reactionTest: reactionTest, recallTest: recallTest, numberSequenceTest: numberSequenceTest });
        } catch (err) {
          console.log(err);
        }
      },

}

