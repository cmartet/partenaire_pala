var expect = require('chai').expect;
var places = require('../app/services/places.service.js');

process.env.NODE_ENV = 'dev';

describe("places service", function () {

    it("getBySearch returns the filtered places", function (done) {
        places.getBySearch("moga", function (err, result) {
            expect(result.length).to.be.equals(2);
            done();
        });
    }).timeout(5000);

    it("getBySearch with accent returns the filtered places", function (done) {
        places.getBySearch("b%C3%A8gles", function (err, result) {
            expect(result.length).to.be.equals(2);
            done();
        });
    }).timeout(5000);

    it("getByLocation returns the filtered places", function (done) {
        places.getByLocation("43.258128", "-0.881101", "10", function (err, result) {
            expect(result.length).to.be.equals(25);
            done();
        });
    }).timeout(5000);
});