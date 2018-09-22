let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://' + process.env.DBUSERNAME + ':' + process.env.DBPASSWORD + '@ds139921.mlab.com:39921/heroku_sr9tsv0j');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//const CLIENT_URL = "http://localhost:3000";
const CLIENT_URL = "https://themovienetwork.herokuapp.com";

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", CLIENT_URL);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/', function (req, res) {
    res.send("Node server running...");
});

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);

function setSession(req, res) {
    let name = req.params['name'];
    let value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    let name = req.params['name'];
    let value = req.session[name];
    res.send(value);
}

let userService = require('./services/user.service.server');
let movieService = require('./services/movie.service.server');
let tmdbService = require('./services/tmdb.service.server');
let nytService = require('./services/nyt.service.server');
let fanService = require('./services/fan.service.server');
let eventService = require('./services/event.service.server');
let adminService = require('./services/admin.service.server');
let reviewService = require('./services/review.service.server');
adminService(app);
userService(app);
tmdbService(app);
nytService(app);
movieService(app);
fanService(app);
eventService(app);
reviewService(app);

app.listen(process.env.PORT || 5000);
