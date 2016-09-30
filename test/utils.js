'use strict'; 

var expect = require('chai').expect;
var utils = require('../lib/utils');

describe('Boolean addition function', function() {
	it('should return true when adding true + true', function() {
		expect(utils.boolAddition(true, true)).to.equal(true);
	});
	it('should return false when adding true + false', function() {
		expect(utils.boolAddition(true, false)).to.equal(false);
	});
});
