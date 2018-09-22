var mongoose = require('mongoose');
var movieRecommendedSchema = require('./movieRecommended.schema.server');
var movieRecommendedModel = mongoose.model('MovieRecommendedModel', movieRecommendedSchema);


function createFollow(userId, movieId) {
    return movieRecommendedModel.create({movie: movieId, user: userId, hash: movieId + userId})
}

function findByHash(userId, movieId) {
    return movieRecommendedModel.findOne({hash: movieId + userId})
}

function findById(id,type){
    return movieRecommendedModel.find({user:id}).populate(type)
}

function findAll() {
    return movieRecommendedModel.find().populate('movie user')
}

function deleteRecommendedMovie(id) {
    return movieRecommendedModel.remove({_id: id})
}


function findRecommendedMoviesForUser(userId) {
    return movieRecommendedModel.find({user: userId}).populate('movie')
}

function removeRecommendedMovie(userId, movieId) {
    return movieRecommendedModel.deleteOne({user: userId, movie: movieId})
}
function del(id){
    return movieRecommendedModel.remove({user:id})
}
var api = {
    createFollow: createFollow,
    findByHash: findByHash,
    findById: findById,
    findAll: findAll,
    deleteRecommendedMovie: deleteRecommendedMovie,
    findRecommendedMoviesForUser: findRecommendedMoviesForUser,
    removeRecommendedMovie: removeRecommendedMovie,
    del:del
};
module.exports = api;