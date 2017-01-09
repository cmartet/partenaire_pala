var Game = require('../models/game');

module.exports = {
    getAll: function(callback) {
        var now = new Date();
        var query = { "date": { "$gte": now } };

        Game.find(query, function(err, games){
            callback(err, games);
        });
    },

    create: function (game, callback) {
        var newGame = new Game(game);
        newGame.save(function (err) {
            callback(err);
        });
    },

    update: function (game, callback) {
        var query = {
            $set: {
                place: game.place,
                date: game.date,
                players: game.players,
                message: game.message
            }
        };

        Game.update({ _id: game._id }, query, function (err) {
            callback(err);
        });
    },

    delete: function (gameId, callback) {
        Game.remove({ _id: gameId }, function (err) {
            callback(err);
        });
    },

    isGameCreator: function (gameId, userId, callback) {
        Game.findById(gameId, function (err, game) {

            if (game) {
                var isCreator = (game.creatorId === userId);
                callback(err, isCreator);
            }
            else {
                callback(err, false);
            }
        });
    },
};