'use strict'; 

var expect = require('chai').expect;
var utils = require('../lib/utils');

var numericArray = [1, 2, 3]; 
var nonNumericArray = [1, 2, 'Not Number'];

describe('The has arrayHasNonNumericValues function', function() {
	it('should return false for arrays of all numbers', function() {
		expect(utils.arrayHasNonNumerics(numericArray)).to.equal(false);
	});
	it('should return true for arrays with non-numbers', function() {
		expect(utils.arrayHasNonNumerics(nonNumericArray)).to.equal(false);
	});
});