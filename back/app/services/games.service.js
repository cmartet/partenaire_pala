var utf8 = require('utf8');
var _ = require('lodash');
var Game = require('../models/game');

require('../helpers/extendString')(String);

module.exports = {

    //Get by date and place
    getBy: function (startDate, endDate, place, callback) {
        var now = new Date();
        var query = { "$and": [] };

        buildDateFilter(query, startDate, endDate);
        buildPlaceFilter(query, place);
        
        Game.find(query, function (err, games) {
            callback(err, games);
        });
    },

    //Create a game
    create: function (game, creator, callback) {
        game.place.location.search_key = game.place.location.address.noAccents();
        game.creator = creator;

        var newGame = new Game(game);
        newGame.save(function (err) {
            callback(err);
        });
    },

    //Join a game
    join: function (gameId, player, callback) {
        var query = {
            "$push": {
                "players": player
            }
        };

        Game.findByIdAndUpdate(gameId, query, function (err) {
            callback(err);
        });
    },

    //Unjoin a game
    unjoin: function (gameId, player, callback) {
        if (!player)
            callback(new Error("no player"));

        var query = {
            "$pull": {
                "players": { _id: player._id }
            }
        };

        Game.findByIdAndUpdate(gameId, query, function (err) {
            callback(err);
        });
    },

    //Update a game
    update: function (game, callback) {
        game.place.location.search_key = game.place.location.address.noAccents();

        var query = {
            "$set": {
                "place":   game.place,
                "date":    game.date,
                "players": game.players,
                "message": game.message
            }
        };

        Game.findByIdAndUpdate(game._id, query, function (err) {
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
            if (err) {
                return callback(err);
            }

            var isCreator = (game.creator._id === userId.toString());
            callback(null, isCreator);
        });
    },

    //Check if the game players are full
    isGameFull: function (gameId, callback) {
        Game.findById(gameId, function (err, game) {
            if (err) {
                return callback(err);
            }

            var isFull = game.players.length >= game.maxMissingPlayers;
            return callback(null, isFull);
        });
    },

    //Check if a user is in a game players
    isPlayerInGame: function (gameId, userId, callback) {
        Game.findById(gameId, function (err, game) {
            if (err) {
                return callback(err);
            }

            var isPlayerInGame = _.filter(game.players, { '_id': userId.toString() }).length > 0;
            callback(null, isPlayerInGame);
        });
    }
};

var buildDateFilter = function (query, startDate, endDate) {
    if (startDate) {
        query["$and"].push({ "date": { "$gte": new Date(startDate) }});
    } else {
        query["$and"].push({ "date": { "$gte": new Date() }});
    }

    if (endDate) {
        query["$and"].push({ "date": { "$lte": new Date(endDate) } });
    }
};

var buildPlaceFilter = function (query, place) {
    if (place) {
        //var search = utf8.decode(place);
        var search = place.noAccents();
        var regex = new RegExp(".*" + search + ".*", "i");
        query["$and"].push({ 'place.location.search_key': regex });
    }
};