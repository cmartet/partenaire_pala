var placesService = require('./../services/places.service');
var handleServiceCallback = require('./../helpers/tools').handleServiceCallback;

module.exports = function (app) {

    app.get('/places/search/:search', function (req, res) {
        var search = req.params.search;
        placesService.getBySearch(search, handleServiceCallback(res));
    });

    app.get('/places/lat/:lat/lng/:lng/radius/:radius', function (req, res) {
        var lat = req.params.lat;
        var long = req.params.lng;
        var radius = req.params.radius;
        placesService.getByLocation(lat, long, radius, handleServiceCallback(res));
    });

    app.get('/places/id/:id', function (req, res) {
        var placeId = req.params.id;
        placesService.get(placeId, handleServiceCallback(res));
    });

    app.post('/places', function (req, res) {
        var newPlace = req.body;
        placesService.create(newPlace, handleServiceCallback(res));
    });
};