var expect = require('chai').expect;
var mongoose = require('mongoose');
var games = require('../app/services/games.service.js');
var config = require('../app/config/factory.js');

process.env.NODE_ENV = 'dev';
mongoose.connect(config.dbUrl);

var game1 = {
    "creator": { "id": "5698e3b6a09e5410e4f5e1b8", "name": "Madame michue" },
    "place": "Moga",
    "date": "2099-01-01T14:00:00.000Z",
    "level": "debutant",
    "maxMissingPlayers": 3,
    "message": "toto",
    "players": []
};

var game2 = {
    "creator": { "id": "5698e3b6a09e5410e4f5e1b8", "name": "Madame michue" },
    "place": "Villenave",
    "date": "2099-01-03T14:00:00.000Z",
    "level": "debutant",
    "maxMissingPlayers": 3,
    "message": "toto",
    "players": []
};

describe("games service", function () {
    //Before all the tests, add test games
    before(function (done) {
        games.create(game1, function () {
            games.create(game2, function () {
                done();
            });
        });
    });

    it("getBy without parameters should return all the future games", function (done) {
        games.getBy(null, null, function (err, result) {
            expect(result.length).to.be.least(2);
            done();
        });
    });

    it("getBy with parameters should return the filtered games", function (done) {
        games.getBy(game1.date, game1.place, function(err, result) {
            expect(result.length).to.be.equals(1);
            expect(result[0].place).to.be.equals(game1.place);
            expect(result[0].date.toString()).to.be.equals(new Date(game1.date).toString());
            done();
        });
    });

    it("update a game should only update the wanted properties", function (done) {
        games.getBy(game2.date, game2.place, function (err, result) {
            var game = result[0];
            game.place = "Mandavit";
            game.date = "2099-01-02T14:00:00.000Z";
            game.message = "tata";

            games.update(game, function (err) {
                expect(err).to.be.null;

                games.getBy(game.date, game.place, function (err, result) {
                    expect(result.length).to.be.equals(1);
                    expect(result[0].place).to.be.equals(game.place);
                    expect(result[0].date.toString()).to.be.equals(game.date.toString());
                    expect(result[0].message).to.be.equals(game.message);
                    done();
                });
            });
        });
    });

    it("isGameCreator with the good creator should return true", function (done) {
        games.getBy(game1.date, game1.place, function (err, result) {
            games.isGameCreator(result[0]._id, game1.creator.id, function (err, isCreator) {
                expect(err).to.be.null;
                expect(isCreator).to.be.true;
                done();
            });
        });
    });

    it("isGameCreator with the bad creator should return false", function (done) {
        games.getBy(game1.date, game1.place, function (err, result) {
            games.isGameCreator(result[0]._id, "1234", function (err, isCreator) {
                expect(err).to.be.null;
                expect(isCreator).to.be.false;
                done();
            });
        });
    });

    //After all the tests, delete the added test games
    after(function (done) {
        var date1 = "2099-01-01T14:00:00.000Z";
        var date2 = "2099-01-02T14:00:00.000Z";
        games.getBy(date1, null, function (err, result) {
            games.delete(result[0]._id, function (err) {
                games.getBy(date2, null, function (err, result) {
                    games.delete(result[0]._id, function (err) {
                        done();
                    });
                });
            });
        });
    });
});