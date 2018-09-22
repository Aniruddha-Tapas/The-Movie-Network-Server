var mongoose = require('mongoose');
var movieSchema = require('./movie.schema.server');
var movieModel = mongoose.model('MovieModel', movieSchema);

function createMovie(newMovie) {
    return movieModel.create(newMovie);
}

function findMoviebyId(id) {
    return movieModel.findOne({id: id})
}

var api = {
    createMovie: createMovie,
    findMoviebyId: findMoviebyId
};

module.exports = api;