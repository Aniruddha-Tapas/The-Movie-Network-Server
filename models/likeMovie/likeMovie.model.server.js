let mongoose = require('mongoose');
let likeMovieSchema = require('./likeMovie.schema.server');
let likeMovieModel = mongoose.model('LikeMovieModel', likeMovieSchema);

function createLike(userId, movieId) {
    return likeMovieModel.create({Movie:movieId, user:userId, hash:movieId+userId})
}
function findByHash(userId, movieId){
    return likeMovieModel.findOne({hash:movieId+userId})
}

function findLikedMovieForUser(userId) {
    return likeMovieModel.find({user: userId}, {Movie: 1}).populate('Movie')
}

function dislikeMovie(userId, movieId) {
    return likeMovieModel.deleteOne({user: userId, Movie: movieId})
}

function findAll() {
    return likeMovieModel.find().populate('Movie user')
}

function deleteLikedMovie(id) {
    return likeMovieModel.remove({_id: id})
}
function del(id){
    return likeMovieModel.remove({user:id})
}

var api = {
    findByHash:findByHash,
    findLikedMovieForUser: findLikedMovieForUser,
    dislikeMovie: dislikeMovie,
    findAll: findAll,
    deleteLikedMovie: deleteLikedMovie,
    del:del
};

module.exports = api;