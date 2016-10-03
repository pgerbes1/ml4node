# ml4node

[![Build Status](https://img.shields.io/travis/pgerbes1/ml4node.svg?style=flat-square)](https://travis-ci.org/pgerbes1/ml4node)
[![Coverage Status](https://img.shields.io/coveralls/pgerbes1/ml4node.svg?style=flat-square)](https://coveralls.io/r/pgerbes1/ml4node)

A basic machine learning node.js library written to learn javascript. 
The two main modules are Vector and Matrix, which implement the linear 
algebra necessary for building machine learning models. 

### Neural Net Example (ml4node/scripts/nn.js)

```javascript
'use strict'; 

const Matrix = require('../lib/matrix');
const sigmoid = require('../lib/utils').sigmoid;

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

var out = new Matrix([[0, 1, 1, 0]]).transpose();
```
Output:

```
Matrix {
  elements:
   [ 0.002796177648568713,
     0.996543313711873,
     0.9964837863426119,
     0.004252828412771536 ],
  rows: 4,
  cols: 1 }
 ```

At this time I suggest you DO NOT use in production. 
