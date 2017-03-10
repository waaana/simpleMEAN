var expect = require("chai").expect;
var request = require("request");

var url;

describe("Calculator API", function (){
    describe("Addition", function () {
        before (function () {
            url = "http://localhost:3000/add?x=10&y=5";
        });

        it("returns 200", function (done) {
            request(url, function (error, response, body) {
                expect (response.statusCode).to.equal(200);
                done();
            });
        });

        it("returns the correct sum", function (done){
            request(url, function (error, response, body) {
                expect(JSON.parse(body).sum).to.equal(15);
                done();
            });
        });
    });

    describe("Subtraction", function () {
        before (function () {
            url = "http://localhost:3000/subtract?x=10&y=5";
        });

        it("returns 200", function (done) {
            request(url, function (error, response, body) {
                expect (response.statusCode).to.equal(200);
                done();
            });
        });

        it("returns the correct sum", function (done) {
            request(url, function (error, response, body) {
                expect(JSON.parse(body).diff).to.equal(5);
                done();
            });
        });
    });
})