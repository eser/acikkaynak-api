'use strict';

const lambdaContext = require('../_shared/lambdaContext');
const action = require('../../actions/github/importRepository');

const main = (event, context) => lambdaContext(
    () => action(JSON.parse(event.Records[0].body))
);

module.exports = {
    'default': main,
};
