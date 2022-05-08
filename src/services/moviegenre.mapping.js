const MovieGenreMapping = require("../database/moviegenre.mapping");
const Genre = require("../database/genres");

// Create and Save a Movie Genre Mapping
exports.createMovieGenreMapping = async (movie_id, genres) => {
    for (let genre of genres) {
        let genre_id = await Genre.getId(genre);

        const movieGenreMapping = new MovieGenreMapping(movie_id, genre_id);

        MovieGenreMapping.add(movieGenreMapping);
    }
};

// Retrieve Genres associated with movie
exports.getGenres = async (movie_id) => {
    let genres = [];
    let genreIds = await MovieGenreMapping.getGenreIds(movie_id);
    for (let i = 0; i < genreIds.length; i++) {
        var genreName = await Genre.getName(genreIds[i].genre_id);
        genres.push(genreName);
    }
    return genres;
};

// Update movie genre mapping
exports.updateGenres = async (movie_id, genres) => {
    let beforeGenres = await this.getGenres(movie_id);
    let genreToRemove = beforeGenres.filter(x => !genres.includes(x));
    let genreToAdd = genres.filter(x => !beforeGenres.includes(x));

    await this.createMovieGenreMapping(movie_id, genreToAdd);
    await this.deleteMovieGenreMapping(movie_id, genreToRemove);

};

// Delete movie genre mapping
exports.deleteMovieGenreMapping = async (movie_id, genres) => {
    for (let i = 0; i < genres.length; i++) {
        var genre_Id = await Genre.getId(genres[i]);
        MovieGenreMapping.delete(movie_id, genre_Id);
    }
};


