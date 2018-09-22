var mongoose = require('mongoose');
var fanFollowedSchema = mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    fan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    hash: {
        type: String,
        unique: true
    }
}, {collection: 'fanFollowed'});
module.exports = fanFollowedSchema;