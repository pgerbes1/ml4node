/**
 * @module ml4node/lib/utils
 */
'use strict'; 

var fold = require('./traversable').fold; 
/**
 * Checks if an array has only numeric values
 * @param {Array} arr - Array of values to be checked 
 */
var isNumericArray = function(arr) {
	let truthArray = []; 
	for (var i = 0; i < arr.length; i++) {
		truthArray[i] = (typeof arr[i] === 'number');
	}
	return truthArray.indexOf(false) === -1;
};

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

var subArraysAreAllNumeric = function(arr) {
	if (isArrayOfArray(arr)) {
      let isNums = arr.map(x => isNumericArray(x));
      return isNums.indexOf(false) === -1;
	} else {
		return false;
	}
};

var subArraysAreNumericAndSameLength = function(arr) {
	let isNum = subArraysAreAllNumeric(arr);
	let isSameLen = subArraysHaveSameLength(arr);
	return (isNum && isSameLen); 
};

module.exports.isNumericArray = isNumericArray;
module.exports.isArrayOfArray = isArrayOfArray; 
module.exports.subArraysHaveSameLength = subArraysHaveSameLength; 
module.exports.subArraysAreAllNumeric = subArraysAreAllNumeric; 
module.exports.subArraysAreNumericAndSameLength = subArraysAreNumericAndSameLength; 
