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
 * Flattens a traversable containing other traversables while 
 * preserving order of elements. Uses recursion to handle all 
 * levels of nesting. 
 * In other words T[T[A]] => T[A]
 * @param {Object} traversable - traversable object of type T[T[A]]
 */
var flatten = function(traversable) {
  let len = traversable.length;
  var flattenedT = []; 
  for (var i = 0; i < len; i++) {
   let sub = traversable[i];
   if (sub instanceof Array) {
		let flatSub = flatten(sub); 
		for (var j = 0; j < flatSub.length; j++) {
			flattenedT.push(flatSub[j]); 
		}   
    } else {
      flattenedT.push(sub); 
    }
  }
  return flattenedT; 
};

module.exports.flatten = flatten;

/**
 * Groups a flat traversable into sequential sub groups.
 * The length of each sub group is determined by size. 
 * In other words T[A] => T[T[A]]
 * @param {Object} traversable - traversable object of type T[T[A]]
 * @param {number} n - number of subgroups to make 
 */
module.exports.group = function(traversable) {
	return function(size) {
		let len = traversable.length; 
		let numGroups = len / size; 
		assert(Number.isInteger(numGroups),
			'Group size must leave no remainder'); 
		let newT = []; 
		for (var i = 0; i < numGroups; i++) {
           let subT = []; 
           for (var j = 0; j < size; j++) {
           	  subT.push(traversable[(i * size) + j]); 
           }
           newT.push(subT); 
		}
    	return newT; 
	};
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
