'use strict'; 

var expect = require('chai').expect;
var Matrix = require('../lib/matrix');
var Vector = require('../lib/vector');

var squareMat = new Matrix([1, 2, 3, 4], 2, 2); 
var squareAA = [[1, 2], [2, 4]]; 
var nonSquareAA = [[1, 2, 3], [4, 5, 6]];
var unevenAA = [[1, 2], [3, 4, 5, 6]];
var goodArray = [1, 2, 3, 4, 5, 6]; 
var badArray = [1, 2, 3, 'four'];
var badAA = [[1, 2], [3, 'four']];

var testMatrix = new Matrix(nonSquareAA);
var squareMatrix = new Matrix(squareAA); 

var A = new Matrix([[1, 1], [1, 1]]);
var B = new Matrix([[1, 1], [1, 1]]);

describe('Instantiating a matrix', function() {
	it('should correctly interpret a well formed array of array', 
		function() {
		expect(new Matrix(squareAA).dimensions()).to.deep.equal([2, 2]);
		expect(new Matrix(nonSquareAA).dimensions()).to.deep.equal([2, 3]);
	});
	it('should return a vector if given an array and rows is set to one', 
		function() {
		expect(new Matrix(goodArray, 1)).to.deep.equal(new Vector(goodArray));
	});
	it('should throw an error if array has sub-array of different lengths', 
		function() {
		expect(function() { 
			  Matrix(unevenAA, 2, 4);
		}).to.throw(Error);
	}); 
		it('should throw an error if array has non-numeric sub-array', 
		function() {
		expect(function() { 
			  Matrix(badAA, 2, 4);
		}).to.throw(Error);
	});
	it('should throw an error if array has non-numeric sub-array', 
		function() {
		expect(function() { 
			  Matrix(unevenAA, 2, 4);
		}).to.throw(Error);
	});
	it('should throw an error if array does not enough data to construct', 
		function() {
		expect(function() { 
			  Matrix(goodArray, 2, 4);
		}).to.throw(Error);
	}); 
	it('should throw an error for Array with non-numerical arguments', 
		function() {
		expect(function() { 
			  Matrix(badArray, 2, 2);
		}).to.throw(Error);
	});
	it('should throw an error for Array with bad col or row arguments', 
		function() {
		expect(function() { 
			  Matrix(goodArray, 2);
		}).to.throw(Error);
	});
}); 

describe('The dimensions of a matrix', function() {
	it('should be an array with its cols and rows', function() {
		expect(squareMat.dimensions()).to.deep.equal([2, 2]);
	});
});

describe('A matrix created with static builder methods', function() {
	it('should return an matrix of values with create', function() {
		expect(
			Matrix.create(2, 2)(x => x)
			).to.deep.equal(new Matrix([0, 1, 2, 3], 2, 2));
	});
	it('should return a matrix of ones with the ones method', function() {
		expect(Matrix.ones(2, 2)).to.deep.equal(
			new Matrix([[1.0, 1.0], [1.0, 1.0]])
			);
	});
	it('should return a matrix of zeros with the zeros method', function() {
		expect(Matrix.zeros(2, 2)).to.deep.equal(
			new Matrix([[0.0, 0.0], [0.0, 0.0]])
			);
	});
	it('should return an identity matrix with the identity method', function() {
		expect(Matrix.identity(3)).to.deep.equal(
			new Matrix([[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]]));
	});
});

describe('Coverting a matrix to an array', function() {
	it('should be an array containing its elements', function() {
		expect(testMatrix.asArray()).to.deep.equal([[1, 2, 3 ], [ 4, 5, 6 ]]);
	});
});

describe('The get method of Matrix', function() {
	it('should return the element at row i and col j', function() {
		expect(squareMatrix.get(0, 1)).to.equal(2);
	});
	it('should throw an error if index does not exist', function() {
		expect(function() { 
			squareMatrix.get(0, 2);
		}).to.throw(Error);
	});
});

describe('The transpose of a matrix', function() {
	it('should have row sums equal to the originals column sums', 
		function() {
		expect(testMatrix.transpose().rowSums()).to.deep.equal(
			 testMatrix.colSums());
	});
});

describe('Coverting a matrix to an array of row vectors', function() {
	it('should be an array containing matrix rows as vector types', 
		function() {
		expect(testMatrix.rowVectors()).to.deep.equal([ 
			new Vector([ 1, 2, 3 ]),
            new Vector([ 4, 5, 6 ])
            ]);
	});
});

describe('Coverting a matrix to an array of column vectors', function() {
	it('should be an array containing matrix columns as vector types', 
		function() {
		expect(testMatrix.colVectors()).to.deep.equal([ 
			new Vector([ 1, 4]),
            new Vector([ 2, 5]),
            new Vector([ 3, 6])
            ]);
	});
});

describe('Multiplying two matrices', function() {
	it('should fail if A.cols !== B.rows', 
		function() {
		expect(function() { 
			  testMatrix.mMult(squareMatrix);
		}).to.throw(Error);
	});
	it('Should return a new matrix', function() {
		expect(squareMatrix.mMult(testMatrix)).to.be.instanceof(Matrix);
	});
	it('should return the dot product of every Row in A with column in B', 
		function() {
		expect(squareMatrix.mMult(testMatrix)).to.deep.equal(
			new Matrix([ 9, 12, 15, 18, 24, 30 ], 2, 3)
			);
		expect(testMatrix.mMult(testMatrix.transpose())).to.deep.equal(
			new Matrix([ 14, 32, 32, 77 ], 2, 2)
			);
	});
});

describe('Row operations on the rows of a matrix', function() {
	it('should be an array of the result of a function on each row vector', 
		function() {
		expect(
			testMatrix.rowOp(x => Math.max.apply(null, x))
			).to.deep.equal([3, 6]);
	});
});

describe('Column operations on the columns of a matrix', function() {
	it('should be an array of the result of a function on each column vector', 
		function() {
		expect(
			testMatrix.colOp(x => Math.max.apply(null, x))
			).to.deep.equal([4, 5, 6]);
	});
});

describe('Summing the rows of a matrix', function() {
	it('should be an array containing the sum of each row vector', 
		function() {
		expect(testMatrix.rowSums()).to.deep.equal([6, 15]);
	});
});

describe('Summing the columns of a matrix', function() {
	it('should be an array containing the sum of each column vector', 
		function() {
		expect(testMatrix.colSums()).to.deep.equal([5, 7, 9]);
	});
});

describe('Getting the mean of each matrix row', function() {
	it('should be the result of the mean function on each row vector', 
		function() {
		expect(testMatrix.rowMeans()).to.deep.equal([2, 5]);
	});
});

describe('Getting the mean of each matrix row', function() {
	it('should be the result of the mean function on each row vector', 
		function() {
		expect(testMatrix.colMeans()).to.deep.equal([2.5, 3.5, 4.5]);
	});
});

describe('Getting the diagonals of a matrix', function() {
	it('should be an array containing each element where i === j', function() {
		expect(testMatrix.diags()).to.deep.equal([1, 5]);
		expect(squareMatrix.diags()).to.deep.equal([1, 4]);
		expect(new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]).diags())
		.to.deep.equal([1, 5, 9]); 
	});
});

describe('Element-wise matrix operations', function() {
	it('should add values with the same index', function() {
		expect(A.add(B)).to.deep.equal(new Matrix([2, 2, 2, 2], 2, 2)); 
	});
	it('should subtract values with the same index', function() {
		expect(A.subtract(B)).to.deep.equal(new Matrix([0, 0, 0, 0], 2, 2)); 
	});
	it('should multiply values with the same index', function() {
		expect(A.multiply(B)).to.deep.equal(new Matrix([1, 1, 1, 1], 2, 2)); 
	});
	it('should divide values with the same index', function() {
		expect(A.divide(B)).to.deep.equal(new Matrix([1, 1, 1, 1], 2, 2)); 
	});
});