'use strict';

const lambdaContext = require('../shared/lambdaContext');
const oauthClient = require('../shared/github/oauthClient');

function getUri() {
    const uri = oauthClient.code.getUri();

    return uri;
}

const main = async (event, context) => lambdaContext(() => {
    const uri = getUri();

    return {
        uri: uri,
    };
});

module.exports = {
    'default': main,
};
