'use strict';

const lambdaContext = require('./_shared/lambdaContext');
const action = require('../actions/index');

const main = (event, context) => lambdaContext(
    () => action(event)
);

module.exports = {
    'default': main,
};
