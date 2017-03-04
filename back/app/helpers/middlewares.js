var mongoose = require('mongoose');
var gamesService = require('./../services/games.service');
var config = require('./../config/factory.js');

module.exports = {
    manageData: function (req, res, next) {
        if (req.data)
            res.json(req.data);
        else
            res.sendStatus(200);
    },

    manageError: function (err, req, res, next) {
        res.status(500).send(err);
    },

    isLoggedIn: function (passport) {
        return function (req, res, next) {
            return passport.authenticate('bearer', { session: false })(req, res, next);
        };
    },

    checkGameRights: function (req, res, next) {
        var gameId = req.params.id;
        var userId = req.user._id;

        //Check if the user has the rights on the game (is the game creator)
        gamesService.isGameCreator(gameId, userId, function (err, isGameCreator) {
            if (isGameCreator)
                return next();

            res.sendStatus(403);
        });
    }
};