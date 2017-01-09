var gamesService = require('./../services/games.services');

module.exports = {
    catchExceptionsError: function (err, req, res, next) {
        res.status(400).send(err.message);
    },

    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.sendStatus(403);
    },

    checkGameRights: function(req, res, next) {
        var gameId = req.params.id;
        var userId = req.user._id; //"5698e3b6a09e5410e4f5e1b8" 

        //Check if the user has the rights on the game (is the game creator)
        gamesService.isGameCreator(gameId, userId, function (err, isGameCreator) {
            if (isGameCreator)
                return next();

            res.sendStatus(403);
        });
    }
};