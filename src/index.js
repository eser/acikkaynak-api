'use strict';

const lambdaContext = require('./shared/lambdaContext');

const main = async (event, context) => lambdaContext(() => {
    return {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
    };
});

module.exports = {
    'default': main,
};
