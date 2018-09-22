module.exports = function (app) {

    let fanFollowedModel = require('../models/fanFollowed/fanFollowed.model.server');
    let likeMovieModel = require('../models/likeMovie/likeMovie.model.server');
    let userModel = require('../models/user/user.model.server');


    function findAllFans(req, res) {
        //userModel.findAllFans()
        userModel.findAllUsers()
            .then(result => res.json(result));
    }

    function followFan(req, res) {
        let user = req.session.currentUser;
        let fanId = req.params['fanId'];
        if (user === undefined) {
            res.sendStatus(500);
        }
        else {
            fanFollowedModel.findByHash(req.session.userId, fanId)
                .then(results => {
                    if (results) {
                        res.sendStatus(501);
                    }
                    else {
                        fanFollowedModel.createFollow(req.session.userId, fanId)
                            .then(() => {
                                res.sendStatus(200);
                            })
                    }
                })
        }
    }

    function getFanContent(req, res) {
        //likeMovieModel.findLikedMovieForUser(req.params['fanId']).then(result => res.json(result));
        userModel.findAllFavoriteMoviesByUserId(req.params['fanId']).then(result => res.json(result));
    }

    function getActorContent(req, res) {
        userModel.findAllEventsByActorId(req.params['actorId'])
            .then(result => res.json(result));
    }

    function unfollowFan(req, res) {
        let fan = req.body;
        let user = req.session.currentUser;
        fanFollowedModel.unfollowFan(user._id, fan._id)
            .then(() => res.sendStatus(200))
    }

    function getFollowedFansForUser(req, res) {
        let user = req.session['currentUser'];
        let resultFans = [];
        fanFollowedModel.findFollowedFansForUser(user._id)
            .then((followedFans) => {
                followedFans.map((followedFan) => {
                    resultFans.push(followedFan.fan)
                });
                res.send(resultFans);
            })
            .catch(() => {
                res.sendStatus(501);
            });
    }

    app.get('/api/fan', findAllFans);
    app.post('/api/fan/:fanId', followFan);
    app.get('/api/fan/likes/:fanId', getFanContent);
    app.get('/api/actor/events/:actorId', getActorContent);
    app.get('/api/fan/following', getFollowedFansForUser);
    app.delete('/api/fan/unfollow', unfollowFan);
};
