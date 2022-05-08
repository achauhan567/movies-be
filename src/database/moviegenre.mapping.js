const db = require("./db");

const MovieGenreMapping = function (movie_id, genre_id) {
    this.movie_id = movie_id;
    this.genre_id = genre_id;
};

//add new movie genre mapping
MovieGenreMapping.add = async (movieGenreMapping) => {
    try {
        const output = await db.query("INSERT INTO movies_genres(movie_id, genre_id) value(?,?)", [movieGenreMapping.movie_id, movieGenreMapping.genre_id]);

        if (output.affectedRows) {
            return true;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

//get genreid associated to movie
MovieGenreMapping.getGenreIds = async (movie_id) => {
    try {
        const output = await db.query("Select genre_id FROM movies_genres WHERE movie_id = ?", [movie_id]);
        return output;
    } catch (err) {
        console.log(err);
        return;
    }
};

//delete movie genre mapping
MovieGenreMapping.delete = async (movie_id, genre_id) => {
    try {
        await db.query("Delete FROM movies_genres WHERE movie_id = ? and genre_id = ?", [movie_id, genre_id]);
        return;
    } catch (err) {
        console.log(err);
        return;
    }
};


module.exports = MovieGenreMapping;