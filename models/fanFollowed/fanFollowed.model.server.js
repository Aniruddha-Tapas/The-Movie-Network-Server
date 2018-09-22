var mongoose = require('mongoose');
var fanFollowedSchema = require('./fanFollowed.schema.server');
var fanFollowedModel = mongoose.model('FanFollowedModel', fanFollowedSchema);

function createFollow(userId, fanId) {
    return fanFollowedModel.create({fan: fanId, follower: userId, hash: fanId + userId})
}

function findByHash(userId, fanId) {
    return fanFollowedModel.findOne({hash: fanId + userId})
}

function findFollowedFansForUser(userId) {
    return fanFollowedModel.find({follower: userId}, {fan: 1}).populate('fan')
}

function unfollowFan(userId, fanId) {
    return fanFollowedModel.deleteOne({follower: userId, fan: fanId})
}
function delFollower(id){
    return fanFollowedModel.remove({follower:id})
}
function delFan(id){
    return fanFollowedModel.remove({fan:id})
}
var api = {
    createFollow: createFollow,
    findByHash: findByHash,
    findFollowedFansForUser: findFollowedFansForUser,
    unfollowFan: unfollowFan,
    delFollower:delFollower,
    delFan:delFan
};

module.exports = api;