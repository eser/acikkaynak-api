const getUser = require('../_shared/github/api/getUser');

async function main(authorizationHeader) {
    const user = await getUser(authorizationHeader);

    return user;
}

module.exports = main;
