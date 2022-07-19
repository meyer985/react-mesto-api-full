const mongoose = require("mongoose");
const { regexp } = require("../utils/regexp");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(e) {
        return regexp.test(e);
      },
      message: "Введен некорректный URL",
    },
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
