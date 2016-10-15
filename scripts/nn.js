'use strict'; 

const Matrix = require('../lib/matrix');
const sigmoid = require('../lib/math').sigmoid;

  var ins = new Matrix([
    [0, 0, 1],
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
  ]);

var out = new Matrix([[0, 1, 1, 0]]).transpose();

var trainNeuralNetwork = function(input, output, iters) {
var sd = 2;
var mean = -1;

var inputWeights = Matrix.create(input.cols, input.rows)(
   () => sd * Math.random() + mean
   ); 
var hiddenWeights = Matrix.create(output.rows, output.cols)(
   () => sd * Math.random() + mean
   );

var inputLayer = input.mMult(inputWeights).map(sigmoid(false));
var hiddenLayer = inputLayer.mMult(hiddenWeights).map(sigmoid(false));

for (var i = 0; i < iters; i++) {
   inputLayer = input.mMult(inputWeights).map(sigmoid(false));
   hiddenLayer = inputLayer.mMult(hiddenWeights).map(sigmoid(false));

    var hiddenError = output.subtract(hiddenLayer).multiply(
    	hiddenLayer.map(sigmoid(true))
    	);
    var inputError = hiddenError.mMult(hiddenWeights.transpose()).multiply(
    	inputLayer.map(sigmoid(true))
    	);

    hiddenWeights = hiddenWeights.add(
    	inputLayer.transpose().mMult(hiddenError)
    	);
    inputWeights = inputWeights.add(input.transpose().mMult(inputError));
  }
 return hiddenLayer;
};

var testResults = trainNeuralNetwork(ins, out, 50000);
console.log(testResults);
