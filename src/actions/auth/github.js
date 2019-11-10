const oauthClient = require('../_shared/github/oauthClient');

function action() {
    return {
        uri: oauthClient.code.getUri(),
    };
}

module.exports = {
    'default': action,
};
