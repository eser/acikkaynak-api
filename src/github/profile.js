'use strict';

const lambdaContext = require('../shared/lambdaContext');
const getUser = require('../shared/github/api/getUser');

const main = async (event, context) => lambdaContext(async () => {
    const user = await getUser(event.headers.Authorization);

    return user;
});

module.exports = {
    'default': main,
};
