class MovieList {
    constructor() {
        this.movies = []
    }

    addMovie(movie) {
        this.movies.push(movie);
    }

    printMovies() {
        console.table(this.movies);
    }
}

module.exports = MovieList;