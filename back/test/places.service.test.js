var expect = require('chai').expect;
var places = require('../app/services/places.service.js');

process.env.NODE_ENV = 'dev';

describe("places service", function () {

    it("getBySearch return the filtered places", function (done) {
        places.getBySearch("moga", function (err, result) {
            expect(result.length).to.be.equals(2);
            done();
        });
    });

    it("getByLocation return the filtered places", function (done) {
        places.getByLocation("43.258128", "-0.881101", "10", function (err, result) {
            expect(result.length).to.be.equals(25);
            done();
        });
    });
});