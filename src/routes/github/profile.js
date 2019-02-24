'use strict';

const lambdaContext = require('../_shared/lambdaContext');
const action = require('../../actions/github/profile');

const main = (event, context) => lambdaContext(
    () => action(event.headers.Authorization)
);

module.exports = {
    'default': main,
};
