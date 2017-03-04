var gamesService = require('./../services/games.service');
var checkGameRights = require('./../helpers/middlewares').checkGameRights;
var isLoggedIn = require('./../helpers/middlewares').isLoggedIn;
var handleServiceCallback = require('./../helpers/tools').handleServiceCallback;

module.exports = function (app, passport) {

    app.get('/games(/date/:date)?(/place/:place)?', function (req, res, next) {
        var date = req.params.date;
        var place = req.params.place;
        gamesService.getBy(date, place, handleServiceCallback(req, res, next));
    });

    app.post('/games', isLoggedIn(passport), function (req, res, next) {
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