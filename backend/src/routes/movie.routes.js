const express = require('express');
const router = express.Router();
const movieController = require("../controllers/movie.controller")
const protectRoute = require("../middlewares/auth.middleware")


router.post("/create", protectRoute , movieController.createMovie)
router.get("/", movieController.getMovies)
router.get("/:id", movieController.getSingleMovie)


module.exports = router