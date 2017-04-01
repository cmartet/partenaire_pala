var config = require('./../config/factory.js');
var FB = require('fb');
var tools = require('./../helpers/tools');

module.exports = {

    sendNotification: (userId, message, callback) => {
        var url = 'https://graph.facebook.com/oauth/access_token?client_id=' + config.facebookAuth.clientID
            + '&client_secret=' + config.facebookAuth.clientSecret
            + '&grant_type=client_credentials';

        tools.httpGet(url, function (err, data) {
            FB.api('/' + userId + '/notifications', 'post',
                {
                    access_token: data.access_token,
                    template: message,
                    href: '/'
                },
                function (response) {
                    if (!response || response.error) {
                        // TODO : log it
                    }
                }
            );
        })
    }

};