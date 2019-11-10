const getOauthClient = require('../_shared/github/oauthClient');
const getUser = require('../_shared/github/api/getUser');
const syncUserFromDb = require('../_shared/data/methods/syncUserFromDb');
const queueAdd = require('../_shared/queue/add');

async function getTokens(uri) {
    const tokens = await getOauthClient().code.getToken(uri);

    return tokens;
}

async function action(query) {
    const tokens = await getTokens({
        query: query,
    });

    const user = await getUser(tokens.accessToken);
    const userRecord = await syncUserFromDb(user, true);

    await queueAdd(
        process.env.SQS_QUEUE_USERS,
        {
            tokenType: tokens.tokenType,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,

            userId: userRecord._id.toString(),
            userGithubId: userRecord.githubId,
        },
    );

    return {
        tokenType: tokens.tokenType,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
    };
}

module.exports = {
    'default': action,
};
