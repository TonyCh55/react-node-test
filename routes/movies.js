const express = require("express");

const router = express.Router();
const moviesController = require("../controllers/movies");

router.get("/", moviesController.getMovies);

router.get("/:id", moviesController.getMovie);

router.post("/", moviesController.addMovie);

router.delete("/:id", moviesController.deleteMovie);

module.exports = router;
