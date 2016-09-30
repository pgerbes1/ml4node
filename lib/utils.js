'use strict'; 

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