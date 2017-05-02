const _ = require('lodash');
const facebookService = require('../services/facebook.service');
const gamesService = require('../services/games.service');
const messages = require('../constants/messages');

require('../helpers/extendDatetime')(Date);

module.exports = {

    sendNotificationGameCreated: function (req, res, next) {
        /*var creatorFbId = req.user.bearer.id;
        var message = messages.game_created.format(game.place.name, game.date.format());

        facebookService.sendNotification(creatorFbId, message);*/

        return next();
    },

    sendNotificationPlayerJoin: function (req, res, next) {
        sendNotificationToCreator(req, messages.game_join);
        return next();
    },

    sendNotificationPlayerUnjoin: function (req, res, next) {
        sendNotificationToCreator(req, messages.game_unjoin);
        return next();
    },

    sendNotificationGameUpdated: function (req, res, next) {
        sendNotificationToPlayers(req, messages.game_updated);
        return next();
    },

    sendNotificationGameDeleted: function (req, res, next) {
        sendNotificationToPlayers(req, messages.game_deleted);
        return next();
    }
};

var sendNotificationToCreator = function (req, message) {
    var gameId = req.params.id;
    var playerName = req.user.bearer.name;

    gamesService.getById(gameId, function (err, game) {
        if (!err) {
            var creatorId = game.creator._id;
            var newMessage = message.format(playerName, game.place.name, game.date.format());

            facebookService.sendNotification(creatorId, newMessage);
        }
    });
};

var sendNotificationToPlayers = function (req, message) {
    var gameId = req.params.id;

    gamesService.getById(gameId, function (err, game) {
        if (!err) {
            var playersId = _.map(game.players, '_id');

            playersId.forEach(function (playerId) {
                var message = messages.game_updated.format(game.place.name, game.date.format());
                facebookService.sendNotification(playerId, message);
            });
        }
    });

};