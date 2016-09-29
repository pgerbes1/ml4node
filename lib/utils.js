/**
 * @module ml4node/lib/utils
 */

'use strict'; 

/**
 * Checks if an array has any non-numeric values
 * @param {Array} arr - Array of values to be checked 
 */
module.exports.arrayHasNonNumerics = function(arr) {
	let truthArray = []; 
	for (var i = 0; i < arr.length; i++) {
		truthArray[i] = (typeof arguments[i] === 'number');
	}
	return truthArray.indexOf(false) === -1;
};
