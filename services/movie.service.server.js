module.exports = app => {
    let userModel = require('../models/user/user.model.server');
    let movieModel = require('../models/movie/movie.model.server');

    favoriteMovies = (req, res) => {
        let userId = req.session['userId'];
        let user = req.session['currentUser'];
        let movie = req.body;
        let newMovie = {
            title: movie.title,
            id: movie.id,
            release_date: movie.release_date,
            poster_path: (movie.poster_path.length !== 0 ? movie.poster_path : '')
        };
        let favorite;
        if (user === undefined)
            res.sendStatus(500);
        else
            movieModel.findMoviebyId(newMovie.id)
                .then(queryResult => {
                    if (queryResult === null) {
                        movieModel.createMovie(newMovie)
                            .then((movie) => {
                                user.favorites.push(movie);
                                userModel.updateUser(userId, user)
                                    .then(() => res.json({favorite: favorite}));
                            })
                    }
                    else {
                        user.favorites.push(queryResult._doc);
                        userModel.updateUser(userId, user)
                            .then(() => res.json({favorite: favorite}));
                    }
                })
    }

    watchlistMovies = (req, res) => {
        let userId = req.session['userId'];
        let user = req.session['currentUser'];
        let movie = req.body;
        let newMovie = {
            title: movie.title,
            id: movie.id,
            release_date: movie.release_date,
            poster_path: (movie.poster_path.length !== 0 ? movie.poster_path : '')
        };

        if (user === undefined)
            res.sendStatus(500);
        else
            movieModel.findMoviebyId(newMovie.id)
                .then(queryResult => {
                    if (queryResult === null) {
                        movieModel.createMovie(newMovie)
                            .then((movie) => {
                                user.watchList.push(movie);
                                userModel.updateUser(userId, user)
                                    .then(() => res.json({watchlist: watchlist}));
                            })
                    } else {
                        user.watchList.push(queryResult._doc);
                        userModel.updateUser(userId, user)
                            .then(() => res.json({watchlist: watchlist}));
                    }
                })
    }


    function dislikeMovie(req, res) {
        let movie = req.body;
        let user = req.session.currentUser;
        userModel.deleteUserFavoriteMovie(user._id, movie._id)
            .then(() => res.sendStatus(200))
    }

    function deleteMovieForUser(req, res) {
        let userId = req.params['userId'];
        let movieId = req.params['movieId'];
        userModel.deleteUserFavoriteMovie(userId, movieId)
            .then(() => res.sendStatus(200));
    }
    function removeMovieFromWatchlist(req, res) {
        let movie = req.body;
        let user = req.session.currentUser;
        userModel.deleteUserWatchlistMovie(user._id, movie._id)
            .then(() => res.sendStatus(200))
    }

    function getFavoriteMovies(req, res) {
        let user = req.session.currentUser;
        userModel.findAllFavoriteMoviesOfUser(user)
            .then(response => res.json(response));
    }

    function getWatchlistMovies(req, res) {
        let user = req.session.currentUser;
        userModel.findAllWatchlistMoviesOfUser(user)
            .then(response => res.json(response));
    }

    app.post('/api/movie/:movieId/favorite', favoriteMovies);
    app.post('/api/movie/:movieId/watchlist', watchlistMovies);
    app.get('/api/movie/favorites', getFavoriteMovies);
    app.get('/api/movie/watchlist', getWatchlistMovies);
    app.delete('/api/dislikeMovie', dislikeMovie);
    app.delete('/api/user/:userId/movie/:movieId/dislike', deleteMovieForUser);
    app.delete('/api/movie/:movieId/watchlist', removeMovieFromWatchlist);

    function getRecommendedMovies() {}
    app.get('/api/recommendedMovies', getRecommendedMovies);
    function removeRecommendedMovie() {}
    app.delete('/api/unrecommendMovie', removeRecommendedMovie);
}