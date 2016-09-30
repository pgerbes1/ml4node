'use strict'; 

var expect = require('chai').expect;
var utils = require('../lib/utils');

var numericArray = [1, 2, 3]; 
var nonNumericArray = [1, 2, 'Not Number'];

describe('The isNumericArray function', function() {
	it('should return true for arrays of all numbers', function() {
		expect(utils.isNumericArray(numericArray)).to.equal(true);
	});
	it('should return false for arrays with non-numbers', function() {
		expect(utils.isNumericArray(nonNumericArray)).to.equal(false);
	});
});
