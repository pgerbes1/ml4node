'use strict'; 

var expect = require('chai').expect;
var Matrix = require('../lib/matrix');

var m = new Matrix([1, 2, 3, 4], 2, 2); 

describe('Instantiating a matrix', function() {
	it('should throw an error if not enough data to construct', function() {
		expect(function() { 
			  Matrix([1, 1, 1, 1], 2, 3);
		}).to.throw(Error);
	}); 
	it('should throw an error for non-numerical arguments', function() {
		expect(function() { 
			  Matrix([1, 1, 1,'cat'], 2, 2);
		}).to.throw(Error);
	});
	it('should throw an error for bad col or row arguments', function() {
		expect(function() { 
			  Matrix([1, 1, 1, 1], 2);
		}).to.throw(Error);
	});
}); 

describe('The dimensions of a matrix', function() {
	it('should be an array with its cols and rows', function() {
		expect(m.dimensions()).to.deep.equal([2, 2]);
	});
});