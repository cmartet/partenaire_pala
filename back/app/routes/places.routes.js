var utf8 = require('utf8');
var placesService = require('./../services/places.services');
var handleServiceCallback = require('./../helpers/tools').handleServiceCallback;

module.exports = function (app) {

    app.get('/places(/search/:search)?', function (req, res) {
        var search = req.params.search;
        if (req.params.search)
            search = utf8.decode(search);

        placesService.getBy(search, handleServiceCallback(res));
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