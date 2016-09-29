'use strict';

var assert = require('assert');
var traversable = require('./traversable');
var utils = require('./utils');

/**
 * Implements a numeric vector type for computations
 * @constructor
 * @param {number} entries - Variable number of numeric values 
 */
function Vector() {
  if (!(this instanceof Vector)) {
    throw new SyntaxError('Constructor must be called with the new operator');
   }

  if (arguments[0] instanceof Array) {

    assert(!utils.arrayHasNonNumerics(arguments[0]),
        'Vector entries must all be numbers');

    this.entries = arguments[0];
    this.dimension = arguments[0].length; 

  } else {

   var args = Array.prototype.slice.call(arguments);

   assert(!utils.arrayHasNonNumerics(args),
        'Vector entries must all be numbers');

   this.entries = args;
   this.dimension = args.length; 
  }
}

/**
 * Apply function to all entries in a Vector  
 * @param {Function} f -  Function to apply on every entry
 */
Vector.prototype.broadcast = function(f) {
    return new Vector(this.entries.map(x => f(x)));
};

/**
 * Add number to all entries in a Vector  
 * @param {number} n -  Add n to every entry 
 */
 Vector.prototype.addScalar = function(n) {
    return this.broadcast(x => x + n);
 };

 /**
 * Subtract number from all entries in a Vector  
 * @param {number} n -  Subtract n from every entry
 */
 Vector.prototype.subtractScalar = function(n) {
    return this.broadcast(x => x - n);
 };

 /**
 * Multiply all entries in a Vector by n 
 * @param {number} n -  Multiply every entry by n
 */
 Vector.prototype.multiplyScalar = function(n) {
    return this.broadcast(x => x * n);
 };

 /**
 * Divide all entries in a Vector by n
 * @param {number} n -  Divide every entry by n
 */
 Vector.prototype.divideScalar = function(n) {
    return this.broadcast(x => x / n);
 };

/**
 * Sum of all entries in a Vector  
 */
Vector.prototype.sum = function() {
    return traversable.fold(this.entries, 0, (a, b) => a + b); 
};

/**
 * Product of all entries in a Vector
 */
Vector.prototype.product = function() {
    return traversable.fold(this.entries, 1, (a, b) => a * b); 
};

/**
 * Element-wise addition of one Vector with another 
 * @param {Vector} vec - Another Vector of same dimension 
 */
Vector.prototype.add = function(vec) {
    let add = (a, b) => a + b; 
	return new Vector(traversable.zipWith(this.entries, vec.entries, add)); 
}; 

/**
 * Element-wise subtraction of one Vector with another 
 * @param {Vector} vec - Another Vector of same dimension 
 */
Vector.prototype.subtract = function(vec) {
   let subtract = (a, b) => a - b; 
   return new Vector(traversable.zipWith(this.entries, vec.entries, subtract)); 
}; 

/**
 * Element-wise multiplication of one Vector with another 
 * @param {Vector} vec - Another Vector of same dimension 
 */
Vector.prototype.multiply = function(vec) {
  let multiply = (a, b) => a * b;
  return new Vector(traversable.zipWith(this.entries, vec.entries, multiply)); 
}; 

/**
 * Element-wise division of one Vector with another 
 * @param {Vector} vec - Another Vector of same dimension 
 */
Vector.prototype.divide = function(vec) {
  let divide = (a, b) => a / b;
  return new Vector(traversable.zipWith(this.entries, vec.entries, divide)); 
}; 

/**
 * Dot product of one Vector with another 
 * @param {Vector} vec - Another Vector of same dimension  
 */
Vector.prototype.dot = function(vec) {
	let mult = this.multiply(vec);
    return mult.sum(); 
};

/**
 * Euclidean Vector norm 
 * @param {Vector} vec - Another Vector of same dimension  
 */
Vector.prototype.norm = function() {
  let selfDot = this.dot(this); 
  return Math.sqrt(selfDot);
}

module.exports = Vector; 
