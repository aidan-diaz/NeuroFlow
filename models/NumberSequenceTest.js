const mongoose = require("mongoose");

const NumberSequenceTestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  easyScores: {
    type: Array,
    required: true
  },
  easyHighScore: {
    type: Number,
    required: true
  },
  mediumScores: {
    type: Array,
    required: true
  },
  mediumHighScore: {
    type: Number,
    required: true
  },
  hardScores: {
    type: Array,
    required: true
  },
  hardHighScore: {
    type: Number,
    required: true
  },
  expertScores: {
    type: Array,
    required: true
  },
  expertHighScore: {
    type: Number,
    required: true
  },
  impossibleScores: {
    type: Array,
    required: true
  },
  impossibleHighScore: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NumberSequenceTest", NumberSequenceTestSchema);