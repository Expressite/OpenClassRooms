const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageURL: { type: String, required: false },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: {
    type: [
      {
        userId: { type: String, required: true },
        grade: { type: Number, required: true },
      },
    ],
    required: false,
  },
  average: { type: Number, required: true },
});

bookSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Book", bookSchema);
