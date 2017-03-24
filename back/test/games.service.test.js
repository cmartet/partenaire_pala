var expect = require('chai').expect;
var mongoose = require('mongoose');
var games = require('../app/services/games.service.js');
var config = require('../app/config/factory.js');

process.env.NODE_ENV = 'dev';
mongoose.connect(config.dbUrl);

var game1 = {
    "place": {
        "fronton_id": 2087,
        "type": "place_libre",
        "photo": "http://static.frontons.net/data/photos/medium/fronton-64130-viodos-abense-de-bas-france-2087_0.jpg",
        "permalink": "http://www.frontons.net/fronton/64130-viodos-abense-de-bas-france-2087.html",
        "name": "64130 Viodos-Abense-de-Bas, France",
        "location":
        {
            "lat": 43.260503,
            "lng": -0.880155,
            "address": "D11, 64130 Viodos-Abense-de-Bas, France"
        }
    },
    "date": "2099-01-01T14:00:00.000Z",
    "level": "debutant",
    "maxMissingPlayers": 3,
    "message": "toto",
    "players": [{ "_id": "7898e3b6a09e5410e4f5e1b8", "name": "Monsieur michue" }]
};

var game2 = {
    "place": {
        "fronton_id": 2088,
        "type": "mur_a_gauche",
        "photo": "http://static.frontons.net/data/photos/medium/fronton-moga.jpg",
        "permalink": "http://www.frontons.net/fronton/fronton-moga.html",
        "name": "Bègles",
        "location":
        {
            "lat": 43.260503,
            "lng": -0.880155,
            "address": "Stade moga, Bègles"
        }
    },
    "date": "2099-01-02T14:00:00.000Z",
    "level": "debutant",
    "maxMissingPlayers": 3,
    "message": "toto",
    "players": []
};

var game3 = {
    "place": {
        "fronton_id": 2088,
        "type": "mur_a_gauche",
        "photo": "http://static.frontons.net/data/photos/medium/fronton-moga.jpg",
        "permalink": "http://www.frontons.net/fronton/fronton-moga.html",
        "name": "Villenave",
        "location":
        {
            "lat": 43.260503,
            "lng": -0.880155,
            "address": "Jai alai, Villenave"
        }
    },
    "date": "2099-01-05T14:00:00.000Z",
    "level": "debutant",
    "maxMissingPlayers": 1,
    "message": "toto",
    "players": [{ "_id": "7898e3b6a09e5410e4f5e1b8", "name": "Monsieur michue" }]
};

var creator = { "_id": "5698e3b6a09e5410e4f5e1b8", "name": "Madame michue" };

describe("games service", function () {
    //Before all the tests, add test games
    before(function (done) {
        games.create(game1, creator, function (err) {
            games.create(game2, creator, function () {
                games.create(game3, creator, function () {
                    done();
                });
            });
        });
    });

    it("getBy without parameters should return all the future games", function (done) {
        games.getBy(null, null, null, function (err, result) {
            expect(result.length).to.be.least(2);
            done();
        });
    });

    it("getBy with start date should return the filtered games", function (done) {
        var startDate = "2099-01-01T14:00:00.000Z";
        games.getBy(startDate, null, null, function(err, result) {
            expect(result.length).to.be.equals(3);
            done();
        });
    });

    it("getBy with start date and end date should return the filtered games", function (done) {
        var startDate = "2099-01-01T14:00:00.000Z";
        var endDate   = "2099-01-01T14:00:00.000Z";
        games.getBy(startDate, endDate, null, function (err, result) {
            expect(result.length).to.be.equals(1);
            expect(result[0].place.name).to.be.equals(game1.place.name);
            expect(result[0].date.toString()).to.be.equals(new Date(game1.date).toString());
            done();
        });
    });

    it("getBy with place return the filtered games", function (done) {
        var place = "begles";
        games.getBy(null, null, place, function (err, result) {
            expect(result.length).to.be.gte(1);
            done();
        });
    });

    it("join a game should add a player in the game players array", function (done) {
        var player = {
            "_id": "7698e3b6a09e5410e4f5e1b9",
            "name": "Monsieur michue"
        };

        var place = "begles";
        games.getBy(game2.date, game2.date, place, function (err, result) {
            var game = result[0];
            games.join(game._id, player, function (err, result) {
                games.getBy(game2.date, game2.date, place, function (err, result) {
                    expect(result[0].players.length).to.be.equal(1);
                    expect(result[0].players[0].name).to.be.equal("Monsieur michue");
                    done();
                });
            });
        });
    });

    it("unjoin a game should remove a player in the game players array", function (done) {
        var player = {
            "_id": "7898e3b6a09e5410e4f5e1b8",
            "name": "Monsieur michue"
        };

        var place = "viodos";
        games.getBy(game1.date, game1.date, place, function (err, result) {
            var game = result[0];
            games.unjoin(game._id, player, function (err, result) {
                games.getBy(game1.date, game1.date, place, function (err, result) {
                    expect(result[0].players.length).to.be.equal(0);
                    done();
                });
            });
        });
    });

    it("update a game should only update the wanted properties", function (done) {
        var place = "begles";
        games.getBy(game2.date, game2.date, place, function (err, result) {
            var game = result[0];
            game.place.location.address = "Mandavit";
            game.date = "2099-01-03T14:00:00.000Z";
            game.message = "tata";

            games.update(game, function (err) {
                expect(err).to.be.null;

                games.getBy(game.date, game.date, game.place.location.address, function (err, result) {
                    expect(result.length).to.be.equals(1);
                    expect(result[0].place.name).to.be.equals(game.place.name);
                    expect(result[0].date.toString()).to.be.equals(game.date.toString());
                    expect(result[0].message).to.be.equals(game.message);
                    done();
                });
            });
        });
    });

    it("isGameCreator with the good creator should return true", function (done) {
        var place = "viodos";
        games.getBy(game1.date, game1.date, place, function (err, result) {
            games.isGameCreator(result[0]._id, game1.creator._id, function (err, isCreator) {
                expect(err).to.be.null;
                expect(isCreator).to.be.true;
                done();
            });
        });
    });

    it("isGameCreator with the bad creator should return false", function (done) {
        var place = "viodos";
        games.getBy(game1.date, game1.date, place, function (err, result) {
            games.isGameCreator(result[0]._id, "1234", function (err, isCreator) {
                expect(err).to.be.null;
                expect(isCreator).to.be.false;
                done();
            });
        });
    });

    it("isGameFull with a game not full should return false", function (done) {
        var place = "viodos";
        games.getBy(game1.date, game1.date, place, function (err, result) {
            games.isGameFull(result[0]._id, function (err, isGameFull) {
                expect(err).to.be.null;
                expect(isGameFull).to.be.false;
                done();
            });
        });
    });

    it("isGameFull with a full game should return true", function (done) {
        var place = "villenave";
        games.getBy(game3.date, game3.date, place, function (err, result) {
            games.isGameFull(result[0]._id, function (err, isGameFull) {
                expect(err).to.be.null;
                expect(isGameFull).to.be.true;
                done();
            });
        });
    });

    it("isPlayerInGame with the player not in game should return false", function (done) {
        var place = "villenave";
        var userId = "7898e3b6a09e5410e4f54568";
        games.getBy(game3.date, game3.date, place, function (err, result) {
            games.isPlayerInGame(result[0]._id, userId, function (err, isPlayerInGame) {
                expect(err).to.be.null;
                expect(isPlayerInGame).to.be.false;
                done();
            });
        });
    });

    it("isPlayerInGame with the player in game should return true", function (done) {
        var place = "villenave";
        var userId = "7898e3b6a09e5410e4f5e1b8";
        games.getBy(game3.date, game3.date, place, function (err, result) {
            games.isPlayerInGame(result[0]._id, userId, function (err, isPlayerInGame) {
                expect(err).to.be.null;
                expect(isPlayerInGame).to.be.true;
                done();
            });
        });
    });

    //After all the tests, delete the added test games
    after(function (done) {
        var start = "2099-01-01T14:00:00.000Z";
        var end   = "2099-01-05T14:00:00.000Z";
        games.getBy(start, end, null, function (err, result) {
            games.delete(result[0]._id, function (err) {
                games.delete(result[1]._id, function (err) {
                    games.delete(result[2]._id, function (err) {
                        done();
                    });
                });
            });
        });
    });
});