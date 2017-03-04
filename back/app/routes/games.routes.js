var gamesService = require('./../services/games.service');
var checkGameRights = require('./../helpers/middlewares').checkGameRights;
var isLoggedIn = require('./../helpers/middlewares').isLoggedIn;
var handleServiceCallback = require('./../helpers/tools').handleServiceCallback;

module.exports = function (app) {

    app.get('/games(/date/:date)?(/place/:place)?', function (req, res) {
        var date = req.params.date;
        var place = req.params.place;
        gamesService.getBy(date, place, handleServiceCallback(res));
    });

    app.post('/games', function (req, res) {
        var newGame = req.body;
        gamesService.create(newGame, handleServiceCallback(res));
    });

    app.put('/games/id/:id', isLoggedIn, checkGameRights, function (req, res) {
        var newGame = req.body;
        gamesService.update(newGame, handleServiceCallback(res));
    });

    app.delete('/games/id/:id', isLoggedIn, checkGameRights, function (req, res) {
        var gameid = req.params.id;
        gamesService.delete(gameid, handleServiceCallback(res));
    });
};