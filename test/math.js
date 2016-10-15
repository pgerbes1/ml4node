'use strict'; 

var expect = require('chai').expect;
var math = require('../lib/math');

var testArray = [-1, 0, 1, 2, 3];

describe('The sigmoid function', function() {
	it('should calculate correct values using derivative', function() {
		expect(
			testArray.map(x => math.sigmoid(true)(x))
			).to.deep.equal(
			[ -2, 0, 0, -2, -6 ]
			);
	});
	it('should return correct values', function() {
		expect(
			testArray.map(x => math.sigmoid(false)(x))
			).to.deep.equal(
			[ 0.2689414213699951,
              0.5,
              0.7310585786300049,
              0.8807970779778823,
              0.9525741268224331 ]
              );
	});
	it('should fail with non-boolean arguments for derivative', function() {
		expect(function() { 
			math.sigmoid(1);
		}).to.throw(Error);
	});
});