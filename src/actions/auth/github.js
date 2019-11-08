const lambdaContext = require('../_shared/lambdaContext');
const oauthClient = require('../_shared/github/oauthClient');

function action() {
    return {
        uri: oauthClient.code.getUri(),
    };
}

function route() {
    return lambdaContext(() => action());
}

module.exports = {
    'default': route,
    'action': action,
};
