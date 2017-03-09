var gamesService = require('./../services/games.service');
var checkGameRights = require('./../helpers/middlewares').checkGameRights;
var isLoggedIn = require('./../helpers/middlewares').isLoggedIn;
var handleServiceCallback = require('./../helpers/tools').handleServiceCallback;

module.exports = function (app, passport) {

    app.get('/games', function (req, res, next) {
        var search    = req.query.search ? JSON.parse(req.query.search) : null;
        var startDate = search ? search.start : null;
        var endDate   = search ? search.end   : null;
        var place     = search ? search.place : null;
        gamesService.getBy(startDate, endDate, place, handleServiceCallback(req, res, next));
    });

    app.post('/games', function (req, res, next) {
        var newGame = req.body;
        gamesService.create(newGame, handleServiceCallback(req, res, next));
    });

    app.put('/games/id/:id', isLoggedIn(passport), checkGameRights, function (req, res, next) {
        var newGame = req.body;
        gamesService.update(newGame, handleServiceCallback(req, res, next));
    });

    app.delete('/games/id/:id', isLoggedIn(passport), checkGameRights, function (req, res, next) {
        var gameid = req.params.id;
        gamesService.delete(gameid, handleServiceCallback(req, res, next));
    });
};