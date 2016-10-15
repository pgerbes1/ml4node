'use strict'; 

const assert = require('assert');

module.exports.sigmoid = function(takeDerivative) {
	assert(typeof takeDerivative === 'boolean',
		'Must pass boolean to use derivative');
    return function (x) {
      return takeDerivative ? 
        x * (1 - x) 
        : 1.0 / (1 + Math.exp(-x));
    };
  };
