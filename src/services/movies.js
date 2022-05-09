const Movie = require("../database/movies");
const MovieGenreMapping = require("../services/moviegenre.mapping");

// Create and Save a new Movie
exports.addMovies = (req, res) => {

  if (!req.body || !req.body.name) {
    res.status(400).send({ message: "bad_request" });
  } else {
    const movie = new Movie(req.body);

    Movie.add(movie, async (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Movie."
        });
      else {
        var isMapped = await MovieGenreMapping.createMovieGenreMapping(data.id, req.body.genre);
        if (isMapped) {
          res.status(500).send({ message: "Some error occurred while creating the Movie." })
        }
        data.genre = req.body.genre;
        res.status(201).send(data);
      }
    });
  }
};

// Retrieve all Movies from the database (with condition).
exports.getMovies = async (req, res) => {
  const name = req.query.name;
  const director = req.query.director;

  Movie.getAll(name, director, async (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movies."
      });
    else {
      for (let i = 0; i < data.length; i++) {
        let genresList = await MovieGenreMapping.getGenres(data[i].id);

        data[i].genre = genresList;
      }
      res.status(200).send(data);
    }
  });
};

// Retrieve Movie by id
exports.getMovieById = async (req, res) => {

  Movie.getMovieById(req.params.id, async (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movies."
      });
    else {
      let genresList = await MovieGenreMapping.getGenres(req.params.id);
      if (genresList.length >= 1) {
        data[0].genre = genresList;
        res.status(200).send(data[0]);
      } else {
        res.status(404).send({
          message: "not_found"
        });
      }

    }
  });
};

// Update a Movie identified by the id in the request
exports.updateMovies = async (req, res) => {

  if (!req.body || !req.body.name) {
    res.status(400).send({ message: "bad_request" });
  } else {
    Movie.updateById(
      req.params.id,
      new Movie(req.body),
      async (err, data) => {
        if (err) {
          if (err.type === "not_found") {
            res.status(404).send({
              message: `Not found Movie with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Movie with id " + req.params.id
            });
          }
        } else {
          await MovieGenreMapping.updateGenres(data.id, req.body.genre);
          data.genre = req.body.genre;
          res.send(data);
        }
      }
    );
  }
};

// Delete a Movie with the specified id in the request
exports.deleteMovies = (req, res) => {
  Movie.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: `Not found Movie with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Movie with id " + req.params.id
        });
      }
    } else res.send({ message: `Movie was deleted successfully!` });
  });
};