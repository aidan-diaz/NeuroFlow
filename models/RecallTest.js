const mongoose = require("mongoose");

const RecallTestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  scores: {
    type: Array,
    required: true
  },
  highScore: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RecallTest", RecallTestSchema);

//possibly expand on schema - have a spot for easyScores, medScores, etc
//need a high score spot for each difficulty as well