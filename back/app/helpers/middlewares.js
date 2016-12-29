module.exports = {
    catchExceptionsError: function (err, req, res, next) {
        res.status(400).send(err.message);
    },

    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated())
            return next();

        res.sendStatus(403);
    }
};