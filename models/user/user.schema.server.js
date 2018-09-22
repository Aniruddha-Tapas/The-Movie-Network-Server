var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: String,
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    email: {type: String, default: ''},
    dob: {type: Date, default:new Date()},
    phone: {type: Number, default: 0},
    city: {type: String, default: ''},
    description: {type: String, default: ''},
    type: String,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'}],
    watchList: [{type: mongoose.Schema.Types.ObjectId, ref: 'MovieModel'}],
    eventLocation: {type: String, default: ''},
    eventDesc: {type: String, default: ''},
    events:[{type: mongoose.Schema.Types.ObjectId, ref: 'EventModel'}]
}, {collection: 'user'});

module.exports = userSchema;