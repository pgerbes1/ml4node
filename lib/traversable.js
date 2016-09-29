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

/**
 * Base builder function for creating traversables from scratch. 
 * Uses partial application for creation of less generic builders.
 * @param {number} n - The length of the traversable
 * @param {Function} f - Function to build traversable with f as 
 * a function of the index
 */
var tabulate = function(n) {
	return function(f) {
		let arr = []; 
		for(var i = 0; i < n; i++) {
          arr[i] = f(i); 
		}
		return arr; 
	};
};

/**
 * Builder function that builds traversable of n copies of a value
 * @param {number} n - The length of the traversable
 * @param {type A} value - Value to fill traversable with 
 */
var fill = function(n){
	return function(value) {
		return tabulate(n)( () => value);
	};
}; 

module.exports.tabulate = tabulate; 
module.exports.fill = fill; 
