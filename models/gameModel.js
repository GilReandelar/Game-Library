const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);