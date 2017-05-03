var _ = require('lodash');
var Game = require('../models/game');
var User = require('../models/user');

const facebookService = require('../services/facebook.service');
const messages = require('../constants/messages');

require('../helpers/extendString')(String);
require('../helpers/extendDatetime')(Date);

module.exports = {

    //Get by date and place
    getBy: function (startDate, endDate, place, callback) {
        var query = {"$and": []};

        buildDateFilter(query, startDate, endDate);
        buildPlaceFilter(query, place);

        Game.find(query, function (err, games) {
            callback(err, games);
        });
    },
    
    //Get by gameId
    getById: function (gameId, callback) {
        Game.findById(gameId, function (err, game) {
            callback(err, game);
        });
    },

    //Create a game
    create: function (game, creator, callback) {
        const _this = this;

        game.place.location.search_key = game.place.location.address.noAccents();
        game.creator = creator;

        var newGame = new Game(game);
        newGame.save(function (err) {
            callback(err);

            const message = messages.game_created.format(new Date(game.date).format(), game.place.name);
            _this.sendNotification(game.creator._id, message, callback)
        });
    },

    //Join a game
    join: function (gameId, player, callback) {
        const _this = this;

        var query = {
            "$push": {
                "players": player
            }
        };

        Game.findByIdAndUpdate(gameId, query, function (err, game) {
            if (err) {
                return callback(err);
            }

            const message = messages.game_join.format(player.name, game.place.name, game.date.format());
            _this.sendNotification(game.creator._id, message, callback)
        });
    },

    //Unjoin a game
    unjoin: function (gameId, player, callback) {
        const _this = this;

        if (!player)
            callback(new Error("no player"));

        var query = {
            "$pull": {
                "players": {_id: player._id}
            }
        };

        Game.findByIdAndUpdate(gameId, query, function (err, game) {
            if (err) {
                return callback(err);
            }

            const message = messages.game_unjoin.format(player.name, game.place.name, game.date.format());
            _this.sendNotification(game.creator._id, message, callback)
        });

    },

    //Update a game
    update: function (game, callback) {
        game.place.location.search_key = game.place.location.address.noAccents();

        var query = {
            "$set": {
                "date":              game.date,
                "level":             game.level,
                "maxMissingPlayers": game.maxMissingPlayers,
                "message":           game.message,
                "place":             game.place,
                "players":           game.players
            }
        };

        Game.findByIdAndUpdate(game._id, query, function (err, game) {
            callback(err);

            // const message = String.format(messages.game_updated.format, new Date(game.date).format(), game.place.name);
            // this.sendNotification(game.creator._id, message, callback)
        });
    },

    //Delete a game
    delete: function (gameId, callback) {
        Game.remove({_id: gameId}, function (err) {
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

            var isPlayerInGame = _.filter(game.players, {'_id': userId.toString()}).length > 0;
            callback(null, isPlayerInGame);
        });
    },

    sendNotification: function (creatorId, message, callback) {
        User.findById(creatorId, function (err, user) {
            if (user) {
                facebookService.sendNotification(user.bearer.id, message);
            }

            return callback(err);
        });
    }
};

var buildDateFilter = function (query, startDate, endDate) {
    if (startDate) {
        query["$and"].push({"date": {"$gte": new Date(startDate)}});
    } else {
        query["$and"].push({"date": {"$gte": new Date()}});
    }

    if (endDate) {
        query["$and"].push({"date": {"$lte": new Date(endDate)}});
    }
};

var buildPlaceFilter = function (query, place) {
    if (place) {
        var search = place.noAccents();
        var regex = new RegExp(".*" + search + ".*", "i");
        query["$and"].push({'place.location.search_key': regex});
    }
};