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
        newGame.save(function (err, data) {
            callback(err, data);
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

        Game.update({ _id: game._id }, query, function (err, data) {
            callback(err, data);
        });
    },

    delete: function (gameId, callback) {
        Game.remove({ _id: gameId }, function (err) {
            callback(err);
        });
    }
};