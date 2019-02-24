'use strict';

const lambdaContext = require('../_shared/lambdaContext');
const action = require('../../actions/auth/githubCallback');

const main = (event, context) => lambdaContext(
    () => action(event.queryStringParameters)
);

module.exports = {
    'default': main,
};
