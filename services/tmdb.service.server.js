module.exports = function (app) {
    const fetch = require('node-fetch');
    const constants = require('../constants');

    findNowPlayingMovies = (req, res) =>
        fetch(constants.TMDB_BASE_URL +
            '/movie/now_playing?api_key=' +
            process.env.TMDB_API_KEY)
            .then(movies => movies.json())
            .then(body => res.send(body));

    findUpcomingMovies = (req, res) =>
        fetch(constants.TMDB_BASE_URL +
            '/movie/upcoming?api_key=' +
            process.env.TMDB_API_KEY)
            .then(movies => movies.json())
            .then(body => res.send(body));


    findPopularMovies = (req, res) =>
        fetch(constants.TMDB_BASE_URL +
            '/discover/movie?sort_by=popularity.desc&api_key=' +
            process.env.TMDB_API_KEY)
            .then(movies => movies.json())
            .then(body => res.send(body));

    discoverMovies = (req, res) => {
        var sortBy = (req.query.sort_by === '' || req.query.sort_by == 'undefined') ? 'popularity' :req.query.sort_by;
        var order = (req.query.order === '' || req.query.order == 'undefined') ? 'desc' : req.query.order;
        fetch(constants.TMDB_BASE_URL +
            '/discover/movie?sort_by=' + sortBy + '.' + order + '&api_key=' +
            process.env.TMDB_API_KEY)
            .then(movies => movies.json())
            .then(body => res.send(body));
    }
    
    searchMovie = (req, res) =>
        fetch(constants.TMDB_BASE_URL +
            '/search/movie?query=' + req.params['movieName'] +
            '&api_key=' + process.env.TMDB_API_KEY)
            .then(movie => movie.json())
            .then(body => res.send(body));
  
    findMovieDetails = (req, res) =>
        fetch(constants.TMDB_BASE_URL +
            '/movie/' + req.params['movieId'] +
            '?api_key=' + process.env.TMDB_API_KEY +
            '&append_to_response=videos,credits,similar')
            .then(movie => movie.json())
            .then(body => res.send(body));

    app.get('/api/movie/get-now-playing', findNowPlayingMovies);
    app.get('/api/movie/upcoming', findUpcomingMovies);
    app.get('/api/movie/popular', findPopularMovies);
    app.get('/api/movie/search/:movieName', searchMovie);
    app.get('/api/movie/detail/:movieId', findMovieDetails);
    app.get('/api/movie/discover', discoverMovies);
}