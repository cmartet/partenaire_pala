var User = require('../models/user');

module.exports = {

    //Get by ID
    getById: function (userId, callback) {
        User.findById(userId, callback);
    }
};