'use strict';

var assert = require('assert');
var product = require('./utils').product; 
var sum = require('./utils').sum; 
var traversable = require('./traversable');
var utils = require('./array-utils');

/**
 * Implements a numeric vector type for computations.
 * Accepts numeric values in an array or as sequence
 * of function arguments.
 * @constructor
 * @param {Object} elements - Variable number of numeric arguments 
 */
function Vector() {
  if (!(this instanceof Vector)) {
    throw new SyntaxError('Constructor must be called with the new operator');
   }

  if (arguments[0] instanceof Array) {

    assert(utils.isNumericArray(arguments[0]),
        'Vector elements must all be numbers');

    this.elements = arguments[0];
    this.dimension = arguments[0].length;

  } else {

   var args = Array.prototype.slice.call(arguments);

   assert(utils.isNumericArray(args),
        'Vector elements must all be numbers');

   this.elements = args;
   this.dimension = args.length;
  }
}

/**
 * Static method for creating Vector from scratch.
 * @param {Function} f - Function of the index to build Vector with
 * @param {number} dim - The dimension (or length) of the Vector
 */
Vector.create = function(dim) {
   return function(f) {
    return new Vector(traversable.tabulate(dim)(f));
  };
};

/**
 * Apply function to all elements in a Vector
 * @param {Function} f -  Function to apply on every element
 */
Vector.prototype.map = function(f) {
  return new Vector(this.elements.map(x => f(x)));
};

/**
 * Get element index i from vector 
 * @param {number} i - Index of element to retrieve 
 */
Vector.prototype.get = function(i) {
  assert(i >= 0 && i <= this.elements.length -1,
    'Vector index given does not exist');
  return this.elements[i]; 
};

/**
 * Returns vector elements in array 
 */
Vector.prototype.asArray = function() {
  return this.elements; 
};

/**
 * Get dimensional array for Vector which 
 * by default has one row 
 */
Vector.prototype.dimensions = function() {
  return [1, this.dimension]; 
};

/** 
 * Combine elements of two vectors to create new Vector
 * preserving ordering. If v.combineElem(w) then the elements
 * of v will be first in new Vector. 
 * @param {Vector} vec - Another Vector of any dimension
 */
Vector.prototype.combineElem = function(vec) {
   let newElems = [this.elements, vec.elements];
   return new Vector(traversable.flatten(newElems));
};

 /**
 * Static method for creating Vector of zeroes from scratch
 * @param {number} dim - The dimension (or length) of the Vector
 */
Vector.zeros = function(dim) {
  return Vector.create(dim)( () => 0.0); 
};

 /**
 * Static method for creating Vector of ones from scratch
 * @param {number} dim - The dimension (or length) of the Vector
 */
Vector.ones = function(dim) {
  return Vector.create(dim)( () => 1.0); 
};

 /**
 * Static method for creating Vector of random values
 * @param {number} dim - The dimension (or length) of the Vector
 */
Vector.random = function(dim) {
  return Vector.create(dim)( () => Math.random()); 
};

/**
 * Add number to all elements in a Vector
 * @param {number} n -  Add n to every element
 */
Vector.prototype.addScalar = function(n) {
  return this.map(x => x + n);
};

 /**
 * Subtract number from all elements in a Vector
 * @param {number} n -  Subtract n from every element
 */
Vector.prototype.subtractScalar = function(n) {
  return this.map(x => x - n);
};

 /**
 * Multiply all elements in a Vector by n
 * @param {number} n -  Multiply every element by n
 */
Vector.prototype.multiplyScalar = function(n) {
  return this.map(x => x * n);
};

 /**
 * Divide all elements in a Vector by n
 * @param {number} n -  Divide every element by n
 */
Vector.prototype.divideScalar = function(n) {
  return this.map(x => x / n);
};

/**
 * Sum of all elements in a Vector
 */
Vector.prototype.sum = function() {
  return sum(this.elements);
};

/**
 * Product of all elements in a Vector
 */
Vector.prototype.product = function() {
  return product(this.elements);
};

/**
 * Element-wise addition of one Vector with another
 * @param {Vector} vec - Another Vector of same dimension
 */
Vector.prototype.add = function(vec) {
  let add = (a, b) => a + b;
	return new Vector(traversable.zipWith(this.elements, vec.elements, add));
};

/**
 * Element-wise subtraction of one Vector with another
 * @param {Vector} vec - Another Vector of same dimension
 */
Vector.prototype.subtract = function(vec) {
  let subtract = (a, b) => a - b;
  return new Vector(traversable.zipWith(this.elements, vec.elements, subtract));
};

/**
 * Element-wise multiplication of one Vector with another
 * @param {Vector} vec - Another Vector of same dimension
 */
Vector.prototype.multiply = function(vec) {
  let multiply = (a, b) => a * b;
  return new Vector(traversable.zipWith(this.elements, vec.elements, multiply));
};

/**
 * Element-wise division of one Vector with another
 * @param {Vector} vec - Another Vector of same dimension
 */
Vector.prototype.divide = function(vec) {
  let divide = (a, b) => a / b;
  return new Vector(traversable.zipWith(this.elements, vec.elements, divide));
};

/**
 * Dot product of one Vector with another Vector or 
 * Matrix of appropriate dimension 
 * @param {Vector} vec - Another Vector of same dimension
 */
Vector.prototype.dot = function(vec) {
	let mult = this.multiply(vec);
  return mult.sum();
};

/**
 * Projects the current vector onto `vector` using
 * @param {Vector} vector
 */
Vector.prototype.vecProjection = function(vec) {
    let s = this.dot(vec) / vec.dot(vec);
    return vec.multiplyScalar(s);
};

/**
 * Euclidean Vector norm
 */
Vector.prototype.norm = function() {
  let selfDot = this.dot(this);
  return Math.sqrt(selfDot);
};

/**
 * Get unit vector
 */
Vector.prototype.unit = function() {
  let vectorLength = this.norm();
  return this.divideScalar(vectorLength);
};

/**
 * L1 (Taxicab) Distance of one Vector with another
 * @param {Vector} vec - Another Vector of same dimension
 */
Vector.prototype.L1Distance = function(vec) {
  let sub = this.subtract(vec);
  let absDiff = sub.map(x => Math.abs(x));
  return absDiff.sum();
};

/**
 * L2 (Euclidean) Distance of one Vector with another
 * @param {Vector} vec - Another Vector of same dimension
 */
Vector.prototype.L2Distance = function(vec) {
  let sub = this.subtract(vec);
  let squared = sub.map(x => x * x);
  return Math.sqrt(squared.sum());
};

module.exports = Vector;
