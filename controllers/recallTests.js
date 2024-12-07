const RecallTest = require("../models/RecallTest");

module.exports = {

    getActiveRecallTest: async (req, res) => {
      try {
        const recallTest = await RecallTest.find({ user: req.user.id });
        res.render("recall.ejs", { user: req.user, scores: recallTest });
      } catch (err) {
        console.log(err);
      }
    },


  };