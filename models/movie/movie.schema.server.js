var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
    title: String,
    id: {type: Number, unique: true},
    release_date: String,
    artist: String,
    poster_path:String
}, {collection: 'movie'});

module.exports = movieSchema;