const Movie = require("../models/movie.model");

async function getAllMovies() {
  return await Movie.find();
}

async function getMovieById(id) {
  return await Movie.findById(id);
}

module.exports = {
  getAllMovies,
  getMovieById,
};
