var Game = require('../models/game');

module.exports = {

    //Get by date and place
    getBy: function (date, place, callback) {
        var now = new Date();
        var query = { "date": { "$gte": now } };

        if (date)  query["date"]["$eq"]  = date;
        if (place) query["place"] = { "$eq": place };

        Game.find(query, function (err, games) {
            callback(err, games);
        });
    },

    //Create a game
    create: function (game, callback) {
        var newGame = new Game(game);
        newGame.save(function (err) {
            callback(err);
        });
    },

    //Update a game
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

    //Delete a game
    delete: function (gameId, callback) {
        Game.remove({ _id: gameId }, function (err) {
            callback(err);
        });
    },

    //Check if a user is the game creator
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
    }
};