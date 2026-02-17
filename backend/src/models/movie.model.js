const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    director: String,
    rating: Number,
    releaseDate: Date,
    category: String,
    description: String,
    posterUrl: String,
  },
  { timestamps: true }
);

const movieModel =  mongoose.model("Movie", movieSchema);


module.exports = movieModel;
