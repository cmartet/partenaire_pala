var gamesService = require('./../services/games.services');
var middlewares = require('./../helpers/middlewares');

module.exports = function (app) {

    app.get('/games', function (req, res) {
        gamesService.getAll(function (err, games) {
            if (err)
                res.status(400).send(err);
            else
                res.json(games);
        });
    });

    app.post('/games', function (req, res) {
        var newGame = req.body;
        gamesService.create(newGame, function (err, data) {
            if (err)
                res.status(400).send(err);
            else
                res.sendStatus(200);
        });
    });

    app.put('/games', function (req, res) {
        var newGame = req.body;
        gamesService.update(newGame, function (err, data) {
            if (err)
                res.status(400).send(err);
            else
                res.sendStatus(200);
        });
    });

    app.delete('/games/id/:id', function (req, res) {
        var gameid = req.params.id;
        gamesService.delete(gameid, function (err) {
            if (err)
                res.status(400).send(err);
            else
                res.sendStatus(200);
        });
    });
};