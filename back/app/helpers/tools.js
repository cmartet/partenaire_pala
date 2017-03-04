var request = require('request-promise');

module.exports = {
    handleServiceCallback: function (res) {
        return function (err, data) {

            if (err)
                res.status(400).send(err);

            else {
                if (data)
                    res.json(data);
                else
                    res.sendStatus(200);
            }
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