module.exports = function (app) {


    let reviewModel = require('../models/review/review.model.server');
    let userModel = require('../models/user/user.model.server');

    function createReview(req,res){
        var reviewInput = req.body;
        var review = {
            title: reviewInput.title,
            text: reviewInput.text,
            movieName: reviewInput.movieName,
            movieId: reviewInput.movieId,
            reviewerId: req.session.currentUser._id,
            reviewer: req.session.currentUser,
            createdDate: new Date()
        }
        reviewModel.createReview(review)
            .then(review=>{
                res.sendStatus(200);
            });
    }

    function findAllReviewsForMovie(req, res) {
        var movieId = req.params['movieId'];
        reviewModel.findAllReviewsForMovie(movieId)
            .then(reviews => res.json(reviews));
    }

    function findAllReviewsForUser(req, res) {
        // var userId = req.params['userId'];
        var userId = req.session.currentUser._id;
        reviewModel.findAllReviewsForUser(userId)
            .then(reviews => res.json(reviews));
    }

    function deleteReview(req, res) {
        let reviewId = req.params['reviewId'];
        let user = req.session.currentUser;

        reviewModel.deleteReview(reviewId)
            .then(() => res.sendStatus(200))
    }

    function updateReview(req,res){
        let review = req.body;
        let reviewTitle = review.reviewTitle;
        let reviewText = review.reviewText;
        let reviewId = review._id;
        reviewModel.updateReview(reviewId, reviewTitle, reviewText)
            .then(() => res.sendStatus(200));
    }

    app.post('/api/review',createReview);
    app.get('/api/review/:movieId',findAllReviewsForMovie);
    app.get('/api/review',findAllReviewsForUser);
    app.delete('/api/review/:reviewId',deleteReview);
    app.put('/api/review',updateReview);
}