// set up ======================================================================
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');

var config = require('./app/config/factory.js');
var middlewares = require('./app/helpers/middlewares.js');
require('./app/services/passport.service')(passport); // pass passport for configuration

var app = express();
var port = process.env.PORT || 8090;

// configuration ===============================================================
mongoose.connect(config.dbUrl, { server: { socketOptions: { keepAlive: 120 } } }).then(
    () => { console.log("Conection to MongoDB OK"); },
    err => { console.log(err); }
);

app.use(cors()); // allow cross-domain requests
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms

// required for passport
app.use(session({
    secret: 'partenairepalasecret', // session secret
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
app.get('/ping', function (req, res) {
    res.sendStatus(200);
});

require('./app/routes/auth.routes')(app, passport);
require('./app/routes/games.routes')(app, passport);
require('./app/routes/places.routes')(app);

// manage sending data ===============================================================
app.use(middlewares.manageData);

// manage sending errors ===============================================================
app.use(function (err, req, res, next) {
    middlewares.manageError(err, req, res, next);
});

// launch ======================================================================
app.listen(port, function () {
    console.log('Server is listening on port ' + port);
});

// ON-STOP ======================================================================
process.on('SIGTERM', function () {
    app.close(function () {
        process.exit(0);
    });
});