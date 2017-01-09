var gamesService = require('./../services/games.services');
var checkGameRights = require('./../helpers/middlewares').checkGameRights;
var isLoggedIn = require('./../helpers/middlewares').isLoggedIn;

module.exports = function (app) {

    app.get('/games', function (req, res) {
        gamesService.getAll(handleServiceCallback(res));
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

    var handleServiceCallback = function (res) {
        return function (err, data) {

            if (err)
                res.status(400).send(err);

            else {
                if (data)
                    res.json(data);
                else
                    res.sendStatus(200);
            }
        };
    }
};