const getUser = require('../_shared/github/api/getUser');

async function action(authorizationHeader) {
    const user = await getUser(authorizationHeader);

    return user;
}

module.exports = {
    'default': action,
};
