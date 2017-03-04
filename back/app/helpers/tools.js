var request = require('request-promise');

module.exports = {
    handleServiceCallback: function (req, res, next) {
        return function (err, data) {
            if (err)
                return next(err);

            req.data = data;
            next();
        };
    },

    httpGet: function (url, callback) {
        var options = { url: url, timeout: 2000 };
        request(options)
            .then(function (data) {
                try {
                    var dataJson = JSON.parse(data);
                    callback(null, dataJson);
                } catch (e) {
                    callback(e);
                }
            })
            .catch(function (reason) {
                callback(reason)
            });
    }
};