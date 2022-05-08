const express = require("express");
const moviesrouter = express.Router();
const movies = require("../services/movies");


// POST new movie
moviesrouter.post("/", movies.addMovies);

// GET movie by id
moviesrouter.get("/:id", movies.getMovieById);

// GET all movies by search
moviesrouter.get("/", movies.getMovies);

// PUT movie for update
moviesrouter.put("/:id", movies.updateMovies);

// DELETE movies by id
moviesrouter.delete("/:id", movies.deleteMovies);

module.exports = moviesrouter;