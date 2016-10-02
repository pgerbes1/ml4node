'use strict'; 

var expect = require('chai').expect;
var utils = require('../lib/utils');

var testArray = [1, 2, 3, 4, 5];

describe('Boolean addition function', function() {
	it('should return true when adding true + true', function() {
		expect(utils.boolAddition(true, true)).to.equal(true);
	});
	it('should return false when adding true + false', function() {
		expect(utils.boolAddition(true, false)).to.equal(false);
	});
});

describe('Array sum function', function() {
	it('should fail for non-numeric arrays', function() {
		expect(function() { 
			utils.sum(['one', 'two']);
		}).to.throw(Error);
	});
	it('should return expected value', function() {
		expect(utils.sum(testArray)).to.equal(15);
	});
});

describe('Array product function', function() {
	it('should fail for non-numeric arrays', function() {
		expect(function() { 
			utils.product(['one', 'two']);
		}).to.throw(Error);
	});
	it('should return expected value', function() {
		expect(utils.product(testArray)).to.equal(120);
	});
});

describe('Array mean function', function() {
	it('should fail for non-numeric arrays', function() {
		expect(function() { 
			utils.mean(['one', 'two']);
		}).to.throw(Error);
	});
	it('should return expected value', function() {
		expect(utils.mean(testArray)).to.equal(3);
	});
});
