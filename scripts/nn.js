'use strict'; 

const Matrix = require('../lib/matrix');

function sigmoid(takeDerivative) {
    return function (x) {
      return takeDerivative ?
        x * (1 - x) :
        1.0 / (1 + Math.exp(-x));
    };
  }

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

  var inputLayer = input.mMult(inputWeights).map(sigmoid());
  var hiddenLayer = inputLayer.mMult(hiddenWeights).map(sigmoid());
for (var i = 0; i < iters; i++) {
   inputLayer = input.mMult(inputWeights).map(sigmoid());
   hiddenLayer = inputLayer.mMult(hiddenWeights).map(sigmoid());

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
