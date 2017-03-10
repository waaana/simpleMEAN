var expect = require("chai").expect;
var calculator = require("../calculator");
describe("Calculator", () => {
    describe("Addition", () =>{
        it ("produce correct result", () => {
            var sum = calculator.add(6,6);
            expect(sum).to.equal(12);
        })
    })
    describe("Substraction", () =>{
        it ("produces correct result", () => {
            var diff = calculator.subtract(15,6);
            expect(diff).to.equal(9);
        })
    })
})