var usersService = require('./../services/users.services');
var middlewares = require('./../helpers/middlewares');

module.exports = function (app) {

    app.get('/users/id/:id', function (req, res) {
        var userId = req.params.id;
        usersService.get(userId, function (err, user) {
            if (err)
                res.status(400).send(err);
            else
                res.json(user);
        });
    });
};