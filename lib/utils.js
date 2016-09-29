/**
 * @module ml4node/lib/utils
 */

'use strict'; 

/**
 * Checks if an array has only numeric values
 * @param {Array} arr - Array of values to be checked 
 */
module.exports.isNumericArray = function(arr) {
	let truthArray = []; 
	for (var i = 0; i < arr.length; i++) {
		truthArray[i] = (typeof arr[i] === 'number');
	}
	return truthArray.indexOf(false) === -1;
};
