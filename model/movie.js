const mongoose = require("mongoose");

const { Schema } = mongoose;

const movie = new Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
  stars: {
    type: Array,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movie);
module.exports = Movie;
