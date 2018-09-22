const mongoose = require('mongoose');
const reviewSchema = require('./review.schema.server');
const reviewModel = mongoose.model('ReviewModel', reviewSchema);
// const userModel = mongoose.model('UserModel', userSchema);

createReview = review =>
    reviewModel.create(review);

findAllReviews = () =>
    reviewModel.find();

findReviewById = reviewId =>
    reviewModel.findById(reviewId);

updateReview = (reviewId, reviewTitle, reviewText) =>
    reviewModel.update({_id:reviewId}, {$set: {title:reviewTitle, text:reviewText} })

deleteReview = reviewId =>
    reviewModel.remove({_id: reviewId});

findAllReviewsForMovie = movieId =>
    reviewModel.find({movieId: movieId});

findAllReviewsForUser = userId =>
    reviewModel.find({reviewerId: userId});


// findAllReviewsForUser = userId =>
//     userModel.findOne({_id: userId }, {reviews: 1}).populate('reviews');

var api = {
    createReview,
    findAllReviews,
    findReviewById,
    updateReview,
    deleteReview,
    findAllReviewsForMovie,
    findAllReviewsForUser
}

module.exports = api;