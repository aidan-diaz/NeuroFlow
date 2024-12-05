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