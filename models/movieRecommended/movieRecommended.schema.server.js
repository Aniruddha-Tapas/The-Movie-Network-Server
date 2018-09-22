var mongoose = require('mongoose');
var movieRecommendedSchema = mongoose.Schema({
    movie: {
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
}, {collection: 'movieRecommended'});
module.exports = movieRecommendedSchema;