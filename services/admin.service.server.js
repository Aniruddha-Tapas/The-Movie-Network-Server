module.exports = function (app) {

    app.get('/api/admin/user', getAllUsers);
    app.get('/api/admin/user/favmovies', getAllUserFavMovies);
    app.post('/api/admin/user', updateUser);
    app.delete('/api/admin/user/:userId', deleteUser);
    app.get('/api/admin/all-favorite-movies', findAllFavoriteMovies);
    app.delete('/api/admin/favoriteMovie/:favoriteMovieId', deleteFavoriteMovie);

    let userModel = require('../models/user/user.model.server');
    let likeMovieModel = require('../models/likeMovie/likeMovie.model.server');
    let fanFollowedModel = require('../models/fanFollowed/fanFollowed.model.server');
    let movieRecommendedModel = require('../models/movieRecommended/movieRecommended.model.server');

    function deleteUser(req, res) {
        let id = req.params.userId;
        userModel.deleteUser(id)
            .then(() => movieRecommendedModel.del(id)
                .then(() => fanFollowedModel.delFollower(id)
                    .then(() => fanFollowedModel.delFan(id)
                        .then(() => likeMovieModel.del(id)
                            .then(() => res.sendStatus(200))
                        )
                    )
                )
            )
    }

    function getAllUsers(req, res) {
        let user = req.session.currentUser;
        if (user === undefined) {
            res.sendStatus(500);
        }
        else if (user.type !== 'Admin') {
            res.sendStatus(501);//not admin trying to get admin info
        }
        else {
            userModel.findAllUsers()
                .then(users => res.json(users))
        }
    }

    function getAllUserFavMovies(req, res) {
        let user = req.session.currentUser;
        if (user === undefined) {
            res.sendStatus(500);
        }
        else if (user.type !== 'Admin') {
            res.sendStatus(501);//not admin trying to get admin info
        }
        else {
            userModel.findAllUsersFavoriteMovies()
                .then(users => res.json(users))
        }
    }

    function updateUser(req, res) {
        let user = req.body;
        if (user._id === undefined) {
            createUser(user)
                .then(() => res.sendStatus(201))
        }
        else {
            userModel.updateUser(user._id, user)
                .then(result => res.sendStatus(200))
        }
    }

    function createUser(user) {
        return userModel.createUser(user);
    }

    function findAllFavoriteMovies(req, res) {
        likeMovieModel.findAll()
            .then((result) => res.json(result))
    }

    function deleteFavoriteMovie(req, res) {
        let id = req.params['favoriteMovieId'];
        likeMovieModel.deleteLikedMovie(id)
            .then(() => res.sendStatus(200))
    }
};
