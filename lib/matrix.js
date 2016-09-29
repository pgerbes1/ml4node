'use strict'; 

var assert = require('assert');
var utils = require('./utils');

function Matrix(vec, rows, cols) {
	assert(typeof rows === 'number' && typeof cols === 'number',
      'Vector elements must all be numbers');

	assert(vec.length === (rows * cols), 
	  'Number of entries does not support matrix size');

	assert(utils.isNumericArray(vec),
      'Matrix elements must all be numbers');

	if (!(this instanceof Matrix)) {
		return new Matrix(vec, rows, cols); 
	}
    
    this.vec  = vec;
    this.rows = rows; 
    this.cols = cols; 
}

Matrix.prototype.dimensions = function() {
	return [this.rows, this.cols]; 
};

module.exports = Matrix;
