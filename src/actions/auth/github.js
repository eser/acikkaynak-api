const oauthClient = require('../_shared/github/oauthClient');

function main() {
    return {
        uri: oauthClient.code.getUri(),
    };
}

module.exports = main;
