'use strict'; 

var assert = require('assert');
/**
 * Returns an array of arrays 
 * @param {Object} traversableOne -  traversable object of type A 
 * @param {Object} traversableTwo -  traversable object of type A 
 */
module.exports.zip = function(traversableOne, traversableTwo) {
	let l = traversableOne.length;

    assert(l === traversableTwo.length,
        'Arrays must be of same length');

	var newArray = [];
	for (var i = 0; i < l; i++) {
		newArray[i] = [traversableOne[i], traversableTwo[i]];
	}
	return newArray; 
};

/**
 * Returns a single traversable object
 * @param {Object} traversableOne -  traversable object of type A 
 * @param {typeof A} traversableTwo -  traversable object of type A 
 * @param {Function} f - Function of type (A, A) => A 
 */
module.exports.zipWith = function(traversableOne, traversableTwo, f) {
	let n = traversableOne.length;

	assert(n === traversableTwo.length, 
        'Arrays must be of same length');

	var newArray = [];
  for (var i = 0; i < n; i++) {
  	newArray[i] = f(traversableOne[i], traversableTwo[i]); 
  }
  return newArray; 
 };

/**
 * Returns a single traversable object
 * @param {Object} traversable -  traversable object of type A 
 * @param {typeof A} - Initial value the fold should start with
 * @param {Function} f - Function of type (A, A) => A 
 */
module.exports.fold = function(traversable, initialValue, f) {
  let l = traversable.length;
	let total = initialValue; 
	for (var i = 0; i < l; i++) {
		total = f(total, traversable[i]); 
	}
    return total; 
};
