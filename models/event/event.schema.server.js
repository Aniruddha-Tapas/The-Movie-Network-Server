let mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
    name: String,
    date: Date,
    location:String,
    desc:String
}, {collection: 'event'});

module.exports = eventSchema;