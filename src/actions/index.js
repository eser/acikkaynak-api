const lambdaContext = require('./_shared/lambdaContext');

function action(input) {
    return {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: input,
    };
}

function route(event) {
    return lambdaContext(() => action(event));
}

module.exports = {
    'default': route,
    'action': action,
};
