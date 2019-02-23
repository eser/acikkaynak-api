'use strict';

const lambdaContext = require('../shared/lambdaContext');
const oauthClient = require('../shared/github/oauthClient');
const getUser = require('../shared/github/api/getUser');
const getUserRepositories = require('../shared/github/api/getUserRepositories');
const syncUserFromDb = require('../shared/mongodb/methods/syncUserFromDb');
const syncRepositoriesFromDb = require('../shared/mongodb/methods/syncRepositoriesFromDb');

async function getTokens(uri) {
    const tokens = await oauthClient.code.getToken(uri);

    return tokens;
}

const main = async (event, context) => lambdaContext(async () => {
    const tokens = await getTokens({
        query: event.queryStringParameters,
    });

    const accessToken = `token ${tokens.accessToken}`;

    const user = await getUser(accessToken);
    await syncUserFromDb(user, true);

    const processedUserIds = [ user.id ];

    const userRepositories = await getUserRepositories(accessToken);

    for (const userRepository of userRepositories) {
        if (userRepository.owner !== undefined && processedUserIds.indexOf(userRepository.owner.id) === -1) {
            await syncUserFromDb(userRepository.owner, false);
            processedUserIds.push(userRepository.owner.id);
        }

        await syncRepositoriesFromDb(userRepository);
    }

    return {
        tokenType: tokens.tokenType,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
    };
});

module.exports = {
    'default': main,
};
