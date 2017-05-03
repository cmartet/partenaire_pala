const _ = require('lodash');
const facebookService = require('../services/facebook.service');
const gamesService = require('../services/games.service');
const usersService = require('../services/users.service');
const messages = require('../constants/messages');

require('../helpers/extendDatetime')(Date);

module.exports = {

    sendNotificationGameCreated: function (req, res, next) {
        var creatorFbId = req.user.bearer.id;
        var message = messages.game_created.format(req.data.date.format(), req.data.place.name);
        facebookService.sendNotification(creatorFbId, message);
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
    var message = message.format(req.user.bearer.name, req.data.place.name, req.data.date.format());

    usersService.getById(req.data.creator._id, function (err, user) {
        if (!err) {
            facebookService.sendNotification(user.bearer.id, message);
        }
    });
};

var sendNotificationToPlayers = function (req, message) {
    var playersId = _.map(req.data.players, '_id');

    playersId.forEach(function (playerId) {
        message = message.format(req.data.place.name, req.data.date.format());
        facebookService.sendNotification(playerId, message);
    });
};