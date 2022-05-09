const express = require("express");
const genrerouter = express.Router();
const genres = require("../services/genres");

// POST genres
genrerouter.post("/", genres.addGenres);

// GET genres 
genrerouter.get("/", genres.getGenres);

// GET genres by id
genrerouter.get("/:id", genres.getGenreById);

// PUT genres 
genrerouter.put("/:id", genres.updateGenres);

// DELETE genres 
genrerouter.delete("/:id", genres.deleteGenres);

module.exports = genrerouter;