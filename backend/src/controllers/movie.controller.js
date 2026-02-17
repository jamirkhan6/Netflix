const movieService = require("../services/storage.service");
const Movie = require("../models/movie.model");


async function createMovie(req, res) {
    try {
        const movie = await Movie.create(req.body)

        res.status(201).json({
            message : "movie created successfully",
            date: movie
        })
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

async function getMovies(req, res) {
    try {
        const movies = await movieService.getAllMovies()
        res.status(200).json(movies)
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}


async function getSingleMovie(req, res) {
    try {
        const movie = await movieService.getMovieById(req.params.id)

        if (!movie) {
            res.status(404).json({
                message : "this movie is not found here"
            })
        }
    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = {createMovie, getMovies, getSingleMovie}