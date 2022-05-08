const Genre = require("../database/genres");

// Create and Save a new Genre
exports.addGenres = (req, res) => {
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Genre
  const genre = new Genre(req.body);

  // Save Genre in the database
  Genre.add(genre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Genre."
      });
    else res.status(201).send(data);
  });
};

// Retrieve all Genres from the database (with condition).
exports.getGenres = (req, res) => {
  const name = req.query.name;

  Genre.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Genres."
      });
    else res.status(200).send(data);
  });
};

// Retrieve Genre with id
exports.getGenreById = (req, res) => {

  Genre.getById(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Genres."
      });
    else res.status(200).send(data);
  });
};

// Update a Genre identified by the id in the request
exports.updateGenres = (req, res) => {
  
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Genre.updateById(
    req.params.id,
    new Genre(req.body),
    (err, data) => {
      if (err) {
        if (err.type === "not_found") {
          res.status(404).send({
            message: `Not found Genre with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Genre with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Genre with the specified id in the request
exports.deleteGenres = (req, res) => {
  Genre.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        res.status(404).send({
          message: `Not found Genre with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Genre with id " + req.params.id
        });
      }
    } else res.send({ message: `Genre was deleted successfully!` });
  });
};