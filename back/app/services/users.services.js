var User = require('../models/user');

module.exports = {
    get: function (userId, callback) {
        User.findById(userId, function (err, user) {
            var resUser = {
                "name": user.facebook.name
            };
            callback(err, resUser);
        });
    }
};