var mongoose = require('mongoose');
var likeMovieSchema = mongoose.Schema({
    Movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MovieModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    hash: {
        type: String,
        unique: true
    }
}, {collection: 'likeMovie'});
module.exports = likeMovieSchema;