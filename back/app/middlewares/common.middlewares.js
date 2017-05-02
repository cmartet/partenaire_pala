module.exports = {
    manageData: function (req, res, next) {
        if (req.data)
            res.json(req.data);
        else
            res.sendStatus(200);
    },

    manageError: function (err, req, res, next) {
        var statusCode = err.statusCode || 500;
        res.status(statusCode).send(err.message);
    }
};