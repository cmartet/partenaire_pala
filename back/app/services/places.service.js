var utf8 = require('utf8');
var tools = require('./../helpers/tools');
var config = require('./../config/factory');

require('../helpers/extendString')(String);

module.exports = {

    //Get the frontons.net places by a search filter
    getBySearch: function (search, callback) {
        var url = buildPlacesApiUrl(search, null, null, null);
        tools.httpGet(url, mapPlaces(callback));
    },

    //Get the frontons.net places by a latitude, longitude and radius
    getByLocation: function (lat, long, radius, callback) {
        var url = buildPlacesApiUrl(null, lat, long, radius);
        tools.httpGet(url, mapPlaces(callback));
    }
};

var buildPlacesApiUrl = function (search, lat, long, radius) {
    var url = config.placesApi;

    if (search) {
        //search = utf8.decode(search).noAccents();
        search = search.noAccents();
        url += "&q=" + search;
    }
    if (lat && long && radius) url += "&lat=" + lat + "&lng=" + long + "&radius=" + radius;

    return url;
};

var mapPlaces = function (callback) {
    return function (error, data) {
        if (error)
            return callback(error);

        callback(null, data.data);
    }
};