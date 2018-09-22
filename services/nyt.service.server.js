module.exports = function (app) {
    const fetch = require('node-fetch');
    const constants = require('../constants');

    findTopNews = (req, res) =>
        fetch('https://api.nytimes.com/svc/topstories/v2/movies.json?&api-key=' +
            process.env.NYT_TOP_STORIES_API_KEY)
            .then(news => news.json())
            .then(body => res.send(body));

    findPopularNews = (req, res) =>
        fetch('https://api.nytimes.com/svc/mostpopular/v2/mostviewed/Movies/7.json?&api-key=' +
            process.env.NYT_TOP_STORIES_API_KEY)
            .then(news => news.json())
            .then(body => res.send(body));

    findReviews = (req, res) =>
        fetch('https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=' +
            process.env.NYT_TOP_STORIES_API_KEY)
            .then(reviews => reviews.json())
            .then(body => res.send(body));

    app.get('/api/news/top', findTopNews);
    app.get('/api/news/popular', findPopularNews);
    app.get('/api/news/reviews', findReviews);
}