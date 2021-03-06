'use strict'; 

var expect = require('chai').expect;
var Vector = require('../lib/vector');

var v = new Vector(1, 2, 3); 
var w = new Vector(1, 2, 1); 
var intNorm = new Vector(2, 2, 2, 2);

describe('An attempt to create a vector without the new keyword', function() {
	it('should throw a syntax error', function() {
		expect(function() { 
			Vector(1, 1);
		}).to.throw(Error);
	});
});

describe('A vector created with static builder methods', function() {
	it('should return an vector of values with create', function() {
		expect(Vector.create(3)(x => x)).to.deep.equal(new Vector(0, 1, 2));
	});
	it('should return a vector of ones with the ones method', function() {
		expect(Vector.ones(3)).to.deep.equal(new Vector(1.0, 1.0, 1.0));
	});
	it('should return a vector of zeros with the zeros method', function() {
		expect(Vector.zeros(3)).to.deep.equal(new Vector(0.0, 0.0, 0.0));
	});
	it('should return a vector of numbers with the random method', function() {
		expect(Vector.random(3).sum()).to.be.at.most(3);
	});
});

describe('A vector created with an array', function() {
	it('should be equal to one created without one', function() {
	   expect(new Vector(1, 1, 1)).to.deep.equal(new Vector([1, 1, 1]));
	});
});

describe('A vector combined with another', function() {
	it('should be equal to a vector of both their elements', function() {
	   expect(v.combineElem(w)).to.deep.equal(new Vector([1, 2, 3, 1, 2, 1]));
	});
});

describe('A vector casted to an array', function() {
	it('should be equal to an array of its elements', function() {
	   expect(v.asArray()).to.deep.equal([1, 2, 3]);
	});
});

describe('The dimension of a vector', function() {
	it('should be a scalar', function() {
		expect(w.dimension).to.be.a('number');
	});
	it('should be the number of its elements', function() {
		expect(v.dimension).to.equal(3);
	});
});

describe('The dimensional array of a vector', function() {
	it('should be an array with the first entry always one', function() {
		expect(v.dimensions()).to.deep.equal([1, 3]);
	});
});

describe('The get method of a vector', function() {
	it('should return the element at index i', function() {
		expect(v.get(2)).to.equal(3);
	});
	it('should throw an error if index does not exist', function() {
		expect(function() { 
			v.get(4);
		}).to.throw(Error);
	});
});

describe('Scalar operations on vectors', function() {
	it('should return a vector for addition', function() {
		expect(v.addScalar(1)).to.be.instanceof(Vector);
	});
	it('should add the same number to each index', function() {
		expect(v.addScalar(1)).to.deep.equal(new Vector(2, 3, 4)); 
	});
	it('should return a vector for subtraction', function() {
		expect(v.subtractScalar(1)).to.be.instanceof(Vector);
	});
	it('should subtract the same number from each index', function() {
		expect(v.subtractScalar(1)).to.deep.equal(new Vector(0, 1, 2)); 
	});
	it('should return a vector for multiplication', function() {
		expect(v.multiplyScalar(2)).to.be.instanceof(Vector);
	});
	it('should multiply each index by the same value', function() {
		expect(v.multiplyScalar(2)).to.deep.equal(new Vector(2, 4, 6)); 
	});
	it('should return a vector for division', function() {
		expect(w.divideScalar(2)).to.be.instanceof(Vector);
	});
	it('should divide each index by the same value', function() {
		expect(w.divideScalar(2)).to.deep.equal(new Vector(0.5, 1, 0.5)); 
	});
});

describe('The sum of a vector', function() {
	it('should return a scalar', function() {
		expect(v.sum()).to.be.a('number');
	});
	it('should be the sum of all its elements', function() {
		expect(v.sum()).to.equal(6);
	});
});

describe('The product of a vector', function() {
	it('should return a scalar', function() {
		expect(w.product()).to.be.a('number');
	});
	it('should be the product of all its elements', function() {
		expect(w.product()).to.equal(2);
	});
});

describe('The norm of a vector', function() {
	it('should return a scalar', function() {
		expect(intNorm.norm()).to.be.a('number');
	});
	it('should be the root of the sum of its elements squared', function() {
		expect(intNorm.norm()).to.equal(4);
	});
});

describe('The unit of a vector', function() {
	it('should return a vector', function() {
		expect(intNorm.unit()).to.be.instanceof(Vector);
	});
	it('should be its elements divided by its norm', function() {
		expect(intNorm.unit()).to.deep.equal(new Vector(0.5, 0.5, 0.5, 0.5));
	});
});

describe('The dot product of two vectors', function() {
	it('should return a scalar', function() {
		expect(v.dot(w)).to.be.a('number');
	});
	it('should return the sum of their element-wise multiplication', function () {
		expect(v.dot(w)).to.equal(8);
	});
});

describe('The vector projection of two vectors', function() {
	it('should return a vector', function() {
		expect(v.vecProjection(w)).to.be.instanceof(Vector);
	});
	it('should calculate (a.b / b.b) * b', function () {
		expect(v.vecProjection(w)).to.deep.equal(new 
			Vector([ 1.3333333333333333, 2.6666666666666665, 1.3333333333333333])
			);
	});
});

describe('The distance between two vectors', function() {
	it('should be a scalar in L1', function() {
		expect(v.L1Distance(w)).to.be.a('number');
	});
	it('should be a scalar in L2', function() {
		expect(v.L2Distance(w)).to.be.a('number');
	});
	it('should correctly calculated in L1', function() {
		expect(v.L1Distance(w)).to.equal(2); 
	});
	it('should correctly calculated in L2', function() {
		expect(v.L2Distance(w)).to.equal(2); 
	});
});

describe('Element-wise vector operations', function() {
	it('should return a vector for addition', function() {
		expect(v.add(w)).to.be.instanceof(Vector);
	});
	it('should add values with the same index', function() {
		expect(v.add(w)).to.deep.equal(new Vector(2, 4, 4)); 
	});
	it('should return a vector for subtraction', function() {
		expect(v.subtract(w)).to.be.instanceof(Vector);
	});
	it('should subtract values with the same index', function() {
		expect(v.subtract(w)).to.deep.equal(new Vector(0, 0, 2)); 
	});
	it('should return a vector for multiplication', function() {
		expect(v.multiply(w)).to.be.instanceof(Vector);
	});
	it('should multiply values with the same index', function() {
		expect(v.multiply(w)).to.deep.equal(new Vector(1, 4, 3)); 
	});
	it('should return a vector for division', function() {
		expect(v.divide(w)).to.be.instanceof(Vector);
	});
	it('should divide values with the same index', function() {
		expect(v.divide(w)).to.deep.equal(new Vector(1, 1, 3)); 
	});
});
