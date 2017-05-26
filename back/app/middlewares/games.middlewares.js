var mongoose = require('mongoose');
var gamesService = require('./../services/games.service');
var config = require('./../config/factory.js');

module.exports = {
    checkGameRights: function (req, res, next) {
        var gameId = req.params.id;
        var userId = req.user._id;

        //Check if the user has the rights on the game (is the game creator)
        gamesService.isGameCreator(gameId, userId, function (err, isGameCreator) {
            if (err)
                return next(err);

            if (!isGameCreator) {
                return next({ 'statusCode': 403, 'message': "You are not authorized to do this" });
            }

            return next();
        });
    },

    checkGameNotFull: function (req, res, next) {
        var gameId = req.params.id;

        //Check if the game players are not full
        gamesService.isGameFull(gameId, function (err, isGameFull) {
            if (err)
                return next(err);

            if (isGameFull)
                return next({ 'statusCode': 400, 'message': "The game is already full" });

            return next();
        });
    },

    checkPlayerNotInGame: function (req, res, next) {
        var gameId = req.params.id;
        var userId = req.user._id;

        //Check if the player is not already in game
        gamesService.isPlayerInGame(gameId, userId, function (err, isPlayerInGame) {
            if (err)
                return next(err);

            if (isPlayerInGame)
                return next({ 'statusCode': 400, 'message': "You are already in the game players" });

            return next();
        });
    },

    checkPlayerInGame: function (req, res, next) {
        var gameId = req.params.id;
        var userId = req.user._id;

        //Check if the player is in the game
        gamesService.isPlayerInGame(gameId, userId, function (err, isPlayerInGame) {
            if (err)
                return next(err);

            if (!isPlayerInGame)
                return next({ 'statusCode': 400, 'message': "You are not in this game" });

            return next();
        });
    }
};