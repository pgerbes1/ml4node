'use strict'; 

var expect = require('chai').expect;
var traversable = require('../lib/traversable');

var numericArrayOne = [1, 2, 3]; 
var numericArrayTwo = [1, 2, 1]; 
var stringArrayOne = ['name', 'age']; 
var stringArrayTwo = ['Bob', '32'];

var addNumbers = (x, y) => x + y; 
var concatStrings = (s, p) => s.concat(p);

describe('Zipping two arrays together', function() {
	it('should return an array of numeric arrays', function() {
		var zippedNumericArray = traversable.zip(numericArrayOne, numericArrayTwo);
		expect(zippedNumericArray).to.deep.equal([[1, 1,], [2, 2], [3, 1]]);
	}); 
	it('should return an array of string arrays', function() {
		var zippedStringArray = traversable.zip(stringArrayOne, stringArrayTwo);
		expect(zippedStringArray).to.deep.equal([['name', 'Bob'],['age', '32']]);
	}); 
}); 

describe('Zipping two arrays together with a function', function() {
	it('should return a numeric array', function() {
		var zippedWithNumeric = traversable.zipWith(
			numericArrayOne, 
			numericArrayTwo, 
			addNumbers);
		expect(zippedWithNumeric).to.deep.equal([2, 4, 4]);
	});
	it('should return a string array', function() {
		var zippedWithString = traversable.zipWith(
			stringArrayOne, 
			stringArrayTwo, 
			concatStrings);
		expect(zippedWithString).to.deep.equal(['nameBob', 'age32']);
	});
});

describe('The fold operator on an array', function() {
	it('should return a single number for array of numbers', function() {
		expect(traversable.fold(
			numericArrayOne, 
			0, 
			addNumbers)).to.equal(6);
	});
	it('should return a single string for array of strings', function() {
		expect(traversable.fold(
			stringArrayOne, 
			'', 
			concatStrings)).to.equal('nameage');
	});
});
