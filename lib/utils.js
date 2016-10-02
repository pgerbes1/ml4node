'use strict'; 

var fold = require('./traversable').fold;
var arrayUtil = require('./array-utils'); 

/**
 * Standard boolean addition to avoid js from 
 * implicitly casting booleans to ints.
 * @param {boolean} p - First boolean argument 
 * @param {boolean} q - Second boolean argument 
 */
module.exports.boolAddition = function(p, q) {
  if (p === q) {
  	return true;
  } else {
  	return false;
  }
};

/**
 * Returns sum of numeric array 
 * @param {Objet} arr - Array of numbers
 */
var sum = function(arr) {
	if (!arrayUtil.isNumericArray(arr)) {
		throw new Error('Array must be numeric');
	}
	return fold(arr, 0, (a, b) => a +b); 
};

module.exports.sum = sum; 

/**
 * Returns product of numeric array 
 * @param {Objet} arr - Array of numbers
 */
module.exports.product = function(arr) {
	if (!arrayUtil.isNumericArray(arr)) {
		throw new Error('Array must be numeric');
	}
	return fold(arr, 1, (a, b) => a * b); 
};

/**
 * Returns mean of numeric array 
 * @param {Objet} arr - Array of numbers
 */
module.exports.mean = function(arr) {
	if (!arrayUtil.isNumericArray(arr)) {
		throw new Error('Array must be numeric');
	}
	return sum(arr) / arr.length; 
};