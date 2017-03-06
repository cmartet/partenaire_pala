var placesService = require('./../services/places.service');
var handleServiceCallback = require('./../helpers/tools').handleServiceCallback;

module.exports = function (app) {

    app.get('/places/search/:search', function (req, res, next) {
        var search = req.params.search;
        placesService.getBySearch(search, handleServiceCallback(req, res, next));
    });

    app.get('/places/lat/:lat/lng/:lng/radius/:radius', function (req, res, next) {
        var lat = req.params.lat;
        var long = req.params.lng;
        var radius = req.params.radius;
        placesService.getByLocation(lat, long, radius, handleServiceCallback(req, res, next));
    });
};