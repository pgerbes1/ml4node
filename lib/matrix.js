'use strict'; 

var assert = require('assert');
var mean = require('./utils').mean; 
var traversable = require('./traversable');
var utils = require('./array-utils');
var Vector = require('./vector');

/**
 * Implements a numeric matrix type for computations. 
 * An array or array of arrays can be used for construction.
 * If an array of arrays is used the first sub-array will 
 * be used as the first row and so on. All sub-arrays must have 
 * the same length. Any values passed in for rows and cols will be ignored.
 * An array with the rows argument set to one will return a vector. 
 * Finally, please note that for safety  an error will throw if the 
 * number of elements in an array does not exactly 
 * equal the rows times columns. 
 * @constructor
 * @param {Object} vec - Vector, Array or Array[Array] of numeric values 
 * @param {number} rows - Number of rows (ignored with Array[Array])
 * @param {number} elements - Number of columns (ignored with Array[Array])
 */
function Matrix(data, rows, cols) {
	if (!(this instanceof Matrix)) {
		return new Matrix(data, rows, cols); 
	}

    if (utils.subArraysAreNumericAndSameLength(data)) {

    	this.elements = traversable.flatten(data); 
    	this.rows = data.length; 
    	this.cols = data[0].length;
    
    } else if (utils.isNumericArray(data) && rows === 1) {

        return new Vector(data);

	} else if (utils.isNumericArray(data)) {

		assert(typeof rows === 'number' && typeof cols === 'number',
		  'Row and column arguments must be numbers');

		assert(data.length === (rows * cols), 
		   'Number of entries does not support matrix size');

		this.elements = data; 
		this.rows = rows; 
		this.cols = cols; 

	} else {

  	throw new Error('Invalid data input use numerical array or array[array]');

    }    
}

/**
 * Get dimensions of Matrix which by convention is rows by columns
 */
Matrix.prototype.dimensions = function() {
	return [this.rows, this.cols]; 
};

/**
 * Returns array of an array made from the matrix elements
 */
Matrix.prototype.asArray = function() {
	return traversable.group(this.elements)(this.cols); 
};

/**
 * Static method for creating Matrix from scratch.
 * @param {Function} f - Function of the index to build Matrix with
 * @param {number} i - The number of rows in Matrix
 * @param {number} j - The number of columns in Matrix
 */
Matrix.create = function(i, j) {
	assert(i > 0 && j > 0, 
		'Rows and cols must be greater than zero');
   return function(f) {
    return new Matrix(traversable.tabulate(i * j)(f), i, j);
  };
};

/**
 * Static method for creating Matrix of zeros
 * @param {number} i - The number of rows in Matrix
 * @param {number} j - The number of columns in Matrix
 */
Matrix.zeros = function(i, j) {
  return Matrix.create(i, j)( () => 0.0); 
};

/**
 * Static method for creating Matrix of ones
 * @param {number} i - The number of rows in Matrix
 * @param {number} j - The number of columns in Matrix
 */
Matrix.ones = function(i, j) {
  return Matrix.create(i, j)( () => 1.0); 
};

/**
 * Static method for creating square indentity Matrix
 * @param {number} s - The size (number of rows and columns) in Matrix
 */
Matrix.identity = function(s) {
  let blankMat = Matrix.zeros(s, s); 
  for (var i = 0; i < s; i++) {
  	blankMat.elements[i * s + i] = 1.0; 
  }
  return blankMat; 
};

/**
 * Get row i, col j element from Matrix
 * @param {number} i - Index of row to retrieve 
 * @param {number} j - Index of column to retrieve 
 */
Matrix.prototype.get = function(i, j) {
  assert(i >= 0 &&  j >= 0 && i <= this.rows - 1 && j <= this.cols - 1,
    'Matrix row and col given does not exist');

  return this.elements[i * this.cols + j]; 
};
/**
 * Transpose Matrix without making array of array. 
 * [1, 2, 3, 4] => [1, 3, 2, 4]
 * Same as: 
 * [[1, 2], [3, 4]] => [[1, 3], [2, 4]]
 */
Matrix.prototype.transpose = function() {
    let numRow = this.rows; 
    let numCol = this.cols; 
    let transposedElem = []; 
	for (var i = 0; i < numRow; i++) {
      for (var j = 0; j < numCol; j++) {
        transposedElem[(j * numRow) + i] = this.elements[(i * numCol) + j];
      }
    }
  return new Matrix(transposedElem, this.cols, this.rows); 
};

/**
 *  Method to turn matrix into array of row vectors.
 */
Matrix.prototype.rowVectors = function() {
	let rowGroups = traversable.group(this.elements)(this.cols);
	return rowGroups.map(row => new Vector(row)); 
};

/**
 *  Method to turn matrix into array of column vectors.
 */
Matrix.prototype.colVectors = function() {
	let matrixT = this.transpose();
	let colGroups = traversable.group(matrixT.elements)(matrixT.cols);
	return colGroups.map(col => new Vector(col));
};

/**
 *  Binds two matrices into one new matrix on row dimension
 *  @param{Matrix} mat - Another matrix of same number of columns
 */
Matrix.prototype.rowBind = function(mat) {
	assert(this.cols === mat.cols, 
		'Both matrices must have same number of columns to bind by row');
    let newArray = traversable.flatten([this.elements, mat.elements]); 
    return new Matrix(newArray, this.rows + mat.rows, this.cols); 
};

/**
 *  Binds two matrices into one new matrix on column dimension
 *  @param{Matrix} mat - Another matrix of same number of columns
 */
Matrix.prototype.colBind = function(mat) {
	assert(this.rows === mat.rows, 
		'Both matrices must have same number of rows to bind by Column');
	let thisArray = this.asArray();
	let matArray = mat.asArray(); 
	let newArray = traversable.zipWith(
		thisArray, matArray, (a, b) => a.concat(b)
		); 
	return new Matrix(newArray);
};

/**
 *  Applys function f over each row in the Matrix
 *  @param{Function} f - Function to apply on each row 
 */
Matrix.prototype.rowOp = function(f) {
	return this.rowVectors().map(v => f(v.elements));
};

/**
 *  Applys function f over each column in the Matrix
 *  @param{Function} f - Function to apply on each column 
 */
Matrix.prototype.colOp = function(f) {
	return this.colVectors().map(v => f(v.elements));
};

/**
 *  Returns sum of row vectors
 */
Matrix.prototype.rowSums = function() {
	return this.rowVectors().map(v => v.sum());
};

/**
 *  Returns sum of column vectors
 */
Matrix.prototype.colSums = function() {
	return this.colVectors().map(v => v.sum());
};

/**
 *  Returns mean of row vectors
 */
Matrix.prototype.rowMeans = function() {
	return this.rowOp(mean); 
};

/**
 *  Returns mean of column vectors
 */
Matrix.prototype.colMeans = function() {
	return this.colOp(mean); 
};

/**
 *  Returns diagonal entries of the matrix
 */
Matrix.prototype.diags = function() {
	let els = this.elements; 
	let diagArr = [];
	for (var i = 0; i < this.rows && i < this.cols; i++) {
		diagArr[i] = els[i * this.cols + i]; 
	}
	return diagArr; 
};

/**
 * Element-wise addition of one Matrix with another
 * @param {Matrix} mat - Another Matrix of same dimensions
 */
Matrix.prototype.add = function(mat) {
		assert(utils.arraysAreEqual(this.dimensions(), mat.dimensions()),
		'Matrix has incorrect shape, rows and cols musts be the same');

	let v = Vector.prototype.add.call(this, mat); 
	return new Matrix(v.elements, this.rows, this.cols);
};

/**
 * Element-wise subtraction of one Matrix with another
 * @param {Matrix} mat - Another Matrix of same dimensions
 */
Matrix.prototype.subtract = function(mat) {
	  	assert(utils.arraysAreEqual(this.dimensions(), mat.dimensions()),
		'Matrix has incorrect shape, rows and cols musts be the same');

	 let v = Vector.prototype.subtract.call(this, mat); 
	 return new Matrix(v.elements, this.rows, this.cols);
};

/**
 * Element-wise multiplication of one Matrix with another
 * @param {Matrix} mat - Another Matrix of same dimensions
 */
Matrix.prototype.multiply = function(mat) {
		assert(utils.arraysAreEqual(this.dimensions(), mat.dimensions()),
		'Matrix has incorrect shape, rows and cols musts be the same');

	let v = Vector.prototype.multiply.call(this, mat); 
	return new Matrix(v.elements, this.rows, this.cols);
};

/**
 * Element-wise division of one Matrix with another
 * @param {Matrix} mat - Another Matrix of same dimensions
 */
Matrix.prototype.divide = function(mat) {
		assert(utils.arraysAreEqual(this.dimensions(), mat.dimensions()),
		'Matrix has incorrect shape, rows and cols musts be the same');

	let v = Vector.prototype.divide.call(this, mat); 
	return new Matrix(v.elements, this.rows, this.cols);
};

/**
 * Multiplication of a matrix with another matrix (or vector)
 * @param {Matrix} matrix - A matrix with appropriate dimensions
 */
Matrix.prototype.mMult = function(matrix) {
	assert(this.cols === matrix.rows,
		'Tensor has incorrect shape. A.cols must equal B.rows'); 
	let rowVecs = this.rowVectors(); 
	let colVecs = matrix.colVectors(); 
	let newMatArray = []; 
	for (var i = 0; i < rowVecs.length; i++) {
		let newRow = []; 
		for (var j = 0; j < colVecs.length; j++) {
			newRow.push(rowVecs[i].dot(colVecs[j]));
		}
		newMatArray.push(newRow);
	}
	return new Matrix(newMatArray);
};

module.exports = Matrix;
