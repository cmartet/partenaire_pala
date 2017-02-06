var _ = require('lodash');
var Place = require('../models/place');

require('../helpers/extendString')(String);

module.exports = {

    //Get the places by a search filter
    getBy: function (search, callback) {
        var query = {};

        if (search) {
            var search = search.noAccents();
            var regex = new RegExp(".*" + search + ".*", "i");
            query = { "$or": [{ 'name.key': regex }, { 'city.key': regex }, { 'adress.key': regex }] }
        }

        Place.find(query, function (err, places) {

            //We don't return the search keys
            places = _.map(places, function (place) {
                return {
                    name: place.name.display,
                    city: place.city.display,
                    adress: place.adress.display,
                    type: place.type,
                    photoUrl: place.photoUrl
                };
            });
            callback(err, places);
        });
    },

    //Get a place by its _id
    get: function (placeId, callback) {
        Place.findById(placeId, function (err, place) {
            callback(err, place);
        });
    },

    //Create a place with a search key and a display string
    create: function (place, callback) {

        var place = {
            name: {
                key: place.name.noAccents().toLowerCase(),
                display: place.name
            },
            city: {
                key: place.city.noAccents().toLowerCase(),
                display: place.city
            },
            adress: {
                key: place.adress.noAccents().toLowerCase(),
                display: place.adress
            },
            type: place.type,
            photoUrl: place.photoUrl
        };

        var newPlace = new Place(place);
        newPlace.save(function (err) {
            callback(err);
        });
    }
};