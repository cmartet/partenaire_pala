var usersService = require('./../services/users.services');
var handleServiceCallback = require('./../helpers/tools').handleServiceCallback;

module.exports = function (app) {

    app.get('/users/id/:id', function (req, res) {
        var userId = req.params.id;
        usersService.get(userId, handleServiceCallback(res));
    });
};