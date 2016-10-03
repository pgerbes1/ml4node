/**
 * @module ml4node/lib/array-utils
 */
'use strict'; 

var assert = require('assert');
/**
 * Checks if an array has only numeric values
 * @param {Array} arr - Array of values to be checked 
 */
var isNumericArray = function(arr) {
	if (arr instanceof Array) {
		let truthArray = []; 
		for (var i = 0; i < arr.length; i++) {
			truthArray[i] = (typeof arr[i] === 'number');
		}
		return truthArray.indexOf(false) === -1;
    } else {
	  return false; 
   }
};

/**
 * Checks if an array has sub-arrays
 * @param {Array} arr - Array of values to be checked 
 */
var isArrayOfArray = function(arr) {
	if (arr instanceof Array) {
        let subArrayTotal = 0;
        let l = arr.length;
        for (var i = 0; i < l; i++) {
        	subArrayTotal += (arr[i] instanceof Array); 
        }
        if (subArrayTotal === l) {
        	return true;
        } else {
        	return false; 
        }
	} else {
		return false;  
	}
};

/**
 * Checks if an sub-arrays of an array are the same length 
 * @param {Array} arr - Array of values to be checked 
 */
var subArraysHaveSameLength = function(arr) {
	if (isArrayOfArray(arr)) {
       let lens = arr.map(a => a.length);
       let uniqueLens = lens.filter(x => x !== lens[0]);
       if (uniqueLens.length > 0) {
       	return false; 
       } else {
       	return true; 
       }
	} else {
		return false; 
	}
};

/**
 * Checks if an sub-arrays of an array are all numeric
 * @param {Array} arr - Array of values to be checked 
 */
var subArraysAreAllNumeric = function(arr) {
	if (isArrayOfArray(arr)) {
      let isNums = arr.map(x => isNumericArray(x));
      return isNums.indexOf(false) === -1;
	} else {
		return false;
	}
};

/**
 * Checks if an sub-arrays of an array are the same 
 * length and numeric
 * @param {Array} arr - Array of values to be checked 
 */
module.exports.subArraysAreNumericAndSameLength = function(arr) {
	let isNum = subArraysAreAllNumeric(arr);
	let isSameLen = subArraysHaveSameLength(arr);
	return (isNum && isSameLen); 
};

/**
 * Recursively Checks if an array is equal to another  
 * @param {Array} arr - Array of values to be checked 
 */
var arraysAreEqual = function(a, b) {
	if (!(a instanceof Array && b instanceof Array)) {
		return false; 
	} 
	if (a.length !== b.length) {
		return false; 
	} 
	for (var i = 0; i < a.length; i++) {
	  	if (a[i] instanceof Array && b[i] instanceof Array) {
          if (!(arraysAreEqual(a[i], b[i]))) {
          	return false; 
          }
        } else if(a[i] !== b[i]) {
        	return false;    
        }
	}
  return true; 
};

module.exports.maxIndex = function(arr) {
	assert(isNumericArray(arr), 
		'Array must be numeric'); 
	return arr.indexOf(Math.max.apply(null, arr)); 
};

module.exports.arraysAreEqual = arraysAreEqual; 
module.exports.isNumericArray = isNumericArray;
module.exports.isArrayOfArray = isArrayOfArray; 
module.exports.subArraysHaveSameLength = subArraysHaveSameLength; 
module.exports.subArraysAreAllNumeric = subArraysAreAllNumeric; 
