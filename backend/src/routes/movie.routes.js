const express = require('express');
const router = express.Router();
const movieController = require("../controllers/movie.controller")


router.post("/create", movieController.createMovie)
router.get("/", movieController.getMovies)
router.get("/:id", movieController.getSingleMovie)


module.exports = router