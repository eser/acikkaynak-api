const getOauthClient = require('../../shared/github/oauthClient');

function action() {
    return {
        uri: getOauthClient().code.getUri(),
    };
}

module.exports = {
    'default': action,
};
