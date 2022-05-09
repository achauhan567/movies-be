const db = require("./db");

const Movie = function (movie) {
    this.name = movie.name;
    this.director = movie.director;
    this.popularity = movie.popularity;
    this.imdb_score = movie.imdb_score;
};

//add new movie to db
Movie.add = async (newMovie, result) => {
    try {
        const output = await db.query("INSERT INTO movies(name, director, popularity, imdb_score) value(?,?,?,?)", [newMovie.name, newMovie.director, newMovie.popularity, newMovie.imdb_score]);

        if (output.affectedRows) {
            result(null, {id: output.insertId, ...newMovie});
            return;
        }
    } catch (err) {
        result(err, null);
        return;
    }
};

//get all movies using filter by name , director
Movie.getAll = async (name, director, result) => {
    let query = "SELECT * FROM movies";
    
    if(name && director){
        query += ` WHERE name LIKE '%${name}%' AND director LIKE '%${director}%'`;
    }else if (name) {
        query += ` WHERE name LIKE '%${name}%'`;
    } else if (director) {
        query += ` WHERE director LIKE '%${director}%'`;
    }
    
    try {
        const output = await db.query(query);
        result(null, output);
        return;
    } catch (err) {
        result(err, null);
        return;
    }
};

//get movie by id
Movie.getMovieById = async (id, result) => {
    try {
        const output = await db.query("SELECT * FROM movies where id = ?",[id]);
        result(null, output);
        return;
    } catch (err) {
        result(err, null);
        return;
    }
};

//update movie by id
Movie.updateById = async (id, movie, result) => {
    try {
        const output = await db.query("UPDATE movies SET name = ? , director= ?, popularity = ?, imdb_score = ? WHERE id = ?", [movie.name, movie.director, movie.popularity, movie.imdb_score, id]);

        if (output.affectedRows == 0) {
            result({ type: "not_found" }, null);
            return;
        }

        result(null, { id: id, ...movie });
        return;
    } catch (err) {
        result(err, null);
        return;
    }
};

//delete movie by id
Movie.deleteById = async (id, result) => {
    try {
        const output = await db.query("DELETE FROM movies WHERE id = ?", [id]);
        if (output.affectedRows == 0) {
            result({ type: "not_found" }, null);
            return;
        }
        result(null, output);
        return;
    } catch (err) {
        result(err, null);
        return;
    }
};

module.exports = Movie;