const RecallTest = require("../models/RecallTest");

module.exports = {
    // getProfile: async (req, res) => {
    //   try {
    //     const tests = await RecallTest.find({ user: req.user.id });
    //     res.render("profile.ejs", { user: req.user, scores: tests });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    getActiveRecallTest: async (req, res) => {
      try {
        const recallTest = await RecallTest.find({ user: req.user.id });
        res.render("recall.ejs", { user: req.user, scores: recallTest });
      } catch (err) {
        console.log(err);
      }
    },


  };