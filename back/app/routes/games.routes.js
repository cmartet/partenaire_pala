var gamesService = require('./../services/games.service');
var checkGameRights = require('./../middlewares/games.middlewares').checkGameRights;
var isLoggedIn = require('./../middlewares/auth.middlewares').isLoggedIn;
var checkGameNotFull = require('./../middlewares/games.middlewares').checkGameNotFull;
var checkPlayerNotInGame = require('./../middlewares/games.middlewares').checkPlayerNotInGame;
var checkPlayerInGame = require('./../middlewares/games.middlewares').checkPlayerInGame;
var sendNotificationGameCreated = require('./../middlewares/notifications.middlewares').sendNotificationGameCreated;
var sendNotificationPlayerJoin = require('./../middlewares/notifications.middlewares').sendNotificationPlayerJoin;
var sendNotificationPlayerUnjoin = require('./../middlewares/notifications.middlewares').sendNotificationPlayerUnjoin;
var sendNotificationGameUpdated = require('./../middlewares/notifications.middlewares').sendNotificationGameUpdated;
var sendNotificationGameDeleted = require('./../middlewares/notifications.middlewares').sendNotificationGameDeleted;
var handleServiceCallback = require('./../helpers/tools').handleServiceCallback;

module.exports = function (app, passport) {

    app.get('/games',
        function (req, res, next) {
            var search    = req.query.search ? JSON.parse(req.query.search) : null;
            var startDate = search ? search.start : null;
            var endDate   = search ? search.end   : null;
            var place     = search ? search.place : null;
            gamesService.getBy(startDate, endDate, place, handleServiceCallback(req, res, next));
        }
    );

    app.get('/games/id/:id',
        isLoggedIn(passport),
        checkGameRights,
        function (req, res, next) {
            var gameId = req.params.id;
            gamesService.getById(gameId, handleServiceCallback(req, res, next));
        }
    );

    app.post('/games',
        isLoggedIn(passport),
        function (req, res, next) {
            var newGame = req.body;
            var creator = { _id: req.user._id, name: req.user.bearer.name };
            gamesService.create(newGame, creator, handleServiceCallback(req, res, next));
        },
        sendNotificationGameCreated
    );

    app.put('/games/join/id/:id',
        isLoggedIn(passport),
        checkGameNotFull,
        checkPlayerNotInGame,
        function (req, res, next) {
            var gameId = req.params.id;
            var player = { "_id": req.user._id, "name": req.user.bearer.name };
            gamesService.join(gameId, player, handleServiceCallback(req, res, next));
        },
        sendNotificationPlayerJoin
    );

    app.put('/games/unjoin/id/:id',
        isLoggedIn(passport),
        checkPlayerInGame,
        function (req, res, next) {
            var gameId = req.params.id;
            var player = { "_id": req.user._id, "name": req.user.bearer.name };
            gamesService.unjoin(gameId, player, handleServiceCallback(req, res, next));
        },
        sendNotificationPlayerUnjoin
    );

    app.put('/games/id/:id',
        isLoggedIn(passport),
        checkGameRights,
        function (req, res, next) {
            var newGame = req.body;
            gamesService.update(newGame, handleServiceCallback(req, res, next));
        },
        sendNotificationGameUpdated
    );

    app.delete('/games/id/:id',
        isLoggedIn(passport),
        checkGameRights,
        function (req, res, next) {
            var gameid = req.params.id;
            gamesService.delete(gameid, handleServiceCallback(req, res, next));
        },
        sendNotificationGameDeleted
    );
};