'use strict'; 

var expect = require('chai').expect;
var utils = require('../lib/array-utils');

var numeric = [1, 2, 3]; 
var nonNumeric = [1, 2, 'Not Number'];

var numericAA = [[1, 2], [2, 4]]; 
var numericAATwo = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]; 

var stringAA = [['this', 'is'], ['an', 'array']];
var mixTypeAA = [[2, 4], ['not', 'number']];

var mixLengthAA = [[2, 3], [3, 4, 5]]; 
var mixTypeLengthAA = [['zero', 1], [1, 2, 'three']];

var AAAndNumber = [[1, 2], 3];
var AAAndString = [[1, 2], 'three']; 

var deepArray = [ [[1, 2],[3, 4]], [[5, 6], [7, 8]]]; 
var deepArrayTwo = [ [[1, 2],[3, 4]], [[5, 6], [7, 8]]]; 

describe('The isNumericArray function', function() {
	it('should return true for arrays of all numbers', function() {
		expect(utils.isNumericArray(numeric)).to.equal(true);
	});
	it('should return false for arrays with non-numbers', function() {
		expect(utils.isNumericArray(nonNumeric)).to.equal(false);
	});
	it('should return false for non-arrays', function() {
		expect(utils.isNumericArray(5)).to.equal(false);
		expect(utils.isNumericArray('five')).to.equal(false);
	});
});

describe('The maxIndex function', function() {
	it('should return index of largest number', function() {
		expect(utils.maxIndex(numeric)).to.equal(2);
	});
});

describe('The isArrayOfArray function', function() {
	it('should return true for arrays containing only arrays', function() {
		expect(utils.isArrayOfArray(numericAA)).to.equal(true);
		expect(utils.isArrayOfArray(stringAA)).to.equal(true);
		expect(utils.isArrayOfArray(mixTypeAA)).to.equal(true);
		expect(utils.isArrayOfArray(mixLengthAA)).to.equal(true);
		expect(utils.isArrayOfArray(mixTypeLengthAA)).to.equal(true);
	});
	it('should return false for single array or mixed', function() {
		expect(utils.isArrayOfArray(numeric)).to.equal(false);
		expect(utils.isArrayOfArray(nonNumeric)).to.equal(false);
		expect(utils.isArrayOfArray(AAAndNumber)).to.equal(false);
		expect(utils.isArrayOfArray(AAAndString)).to.equal(false);
	});
});

describe('The subArraysHaveSameLength function', function() {
	it('should be true for array[array] with sub-arrays with equal length', 
		function() {
		expect(utils.subArraysHaveSameLength(numericAA)).to.equal(true);
	    expect(utils.subArraysHaveSameLength(stringAA)).to.equal(true);
		expect(utils.subArraysHaveSameLength(mixTypeAA)).to.equal(true);
	});
    it('should be false for array[array] with sub-arrays with unequal length', 
		function() {
		expect(utils.subArraysHaveSameLength(mixLengthAA)).to.equal(false);
	    expect(utils.subArraysHaveSameLength(mixTypeLengthAA)).to.equal(false);
		expect(utils.subArraysHaveSameLength(AAAndNumber)).to.equal(false);
		expect(utils.subArraysHaveSameLength(AAAndString)).to.equal(false);
	});
	 it('should be false for regular arrays or array[array, non-array]', 
		function() {
		expect(utils.subArraysHaveSameLength(numeric)).to.equal(false);
	    expect(utils.subArraysHaveSameLength(nonNumeric)).to.equal(false);
	});
});

describe('The subArraysAreAllNumeric function', function() {
	it('should be true for array[array] with numeric sub-arrays', 
		function() {
		expect(utils.subArraysAreAllNumeric(numericAA)).to.equal(true);
	    expect(utils.subArraysAreAllNumeric(mixLengthAA)).to.equal(true);
	});
    it('should be false for array[array] with non-numeric sub-arrays', 
		function() {
		expect(utils.subArraysAreAllNumeric(stringAA)).to.equal(false);
	    expect(utils.subArraysAreAllNumeric(mixTypeAA)).to.equal(false);
	    expect(utils.subArraysAreAllNumeric(mixTypeLengthAA)).to.equal(false);
	});
	 it('should be false for regular arrays or array[array, non-array]', 
		function() {
		expect(utils.subArraysAreAllNumeric(AAAndNumber)).to.equal(false);
	    expect(utils.subArraysHaveSameLength(AAAndString)).to.equal(false);
	    expect(utils.subArraysHaveSameLength(numeric)).to.equal(false);
	    expect(utils.subArraysHaveSameLength(nonNumeric)).to.equal(false);
	});
});

describe('The subArraysAreNumericAndSameLength function', function() {
	it('should be true for array[array] with numeric same length sub-arrays', 
		function() {
		expect(utils.subArraysAreNumericAndSameLength(
			numericAA
			)).to.equal(true);
	    expect(utils.subArraysAreNumericAndSameLength(
	    	numericAATwo
	    	)).to.equal(true);
	});
    it('should be false for any other kind of object', 
		function() {
		expect(utils.subArraysAreNumericAndSameLength(stringAA)).to.equal(false);
	    expect(utils.subArraysAreNumericAndSameLength(
	    	mixTypeAA
	    	)).to.equal(false);
	    expect(utils.subArraysAreNumericAndSameLength(
	    	mixTypeLengthAA
	    	)).to.equal(false);
		expect(utils.subArraysAreNumericAndSameLength(
			AAAndNumber
			)).to.equal(false);
	    expect(utils.subArraysAreNumericAndSameLength(
	    	AAAndString
	    	)).to.equal(false);
	    expect(utils.subArraysAreNumericAndSameLength(
	    	numeric
	    	)).to.equal(false);
	    expect(utils.subArraysAreNumericAndSameLength(
	    	nonNumeric
	    	)).to.equal(false);
	    expect(utils.subArraysAreNumericAndSameLength(1)).to.equal(false);
	    expect(utils.subArraysAreNumericAndSameLength('one')).to.equal(false);
	});
});

describe('The arraysAreEqual function', function() {
	it('should return true for arrays that have same elements', function() {
		expect(utils.arraysAreEqual(deepArray, deepArrayTwo)).to.equal(true);
	});
	it('should return false for arrays with different elements', function() {
		expect(utils.arraysAreEqual([1, 2], [1, 3])).to.equal(false);
	});
	it('should return false for non-arrays', function() {
		expect(utils.arraysAreEqual([1,2], 5)).to.equal(false);
	});
	it('should return false for arrays of unequal length', function() {
		expect(utils.arraysAreEqual([1,2], [1, 2, 3])).to.equal(false);
	});
	it('should return false for arrays with different sub-arrays', function() {
		expect(utils.arraysAreEqual(
			[[1,2],[3, 4]],[[1, 2],[3, 5]])
		).to.equal(false);
	});
});
