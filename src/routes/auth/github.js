'use strict';

const lambdaContext = require('../_shared/lambdaContext');
const action = require('../../actions/auth/github');

const main = (event, context) => lambdaContext(
    () => action()
);

module.exports = {
    'default': main,
};
