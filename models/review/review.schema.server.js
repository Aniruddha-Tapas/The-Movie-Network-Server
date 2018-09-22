var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    title: String,
    text: String,
    movieName: String,
    movieId: {type: String, required: true},
    reviewerId: {type: mongoose.Schema.ObjectId, ref: 'UserModel', required: true},
    reviewer: {type: mongoose.Schema.Types.Object, ref: 'UserModel'},
    createdDate: {type: Date, default: Date.now()}
});

module.exports = reviewSchema;