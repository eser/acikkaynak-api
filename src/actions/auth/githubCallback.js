const getOauthClient = require('../_shared/github/oauthClient');
const getUser = require('../_shared/github/methods/getUser');
const syncUserFromDb = require('../_shared/data/methods/syncUserFromDb');
const publishUsersUpdate = require('../_shared/notifications/methods/publishUsersUpdate');

async function getTokens(uri) {
    const tokens = await getOauthClient().code.getToken(uri);

    return tokens;
}

async function action(query) {
    const tokens = await getTokens({
        query: query,
    });

    const user = await getUser(tokens.accessToken);
    const userRecord = await syncUserFromDb(user, 'github', new Date());

    const userId = userRecord._id.toString();

    // the function below is awaitable, but it is not critical
    // to be awaited for sending user response
    publishUsersUpdate({
        tokenType: tokens.tokenType,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,

        userId: userId,
        userGithubId: userRecord.providers.github.id,
    });

    return {
        tokenType: tokens.tokenType,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,

        user: {
            id: userId,
            name: userRecord.name,
            // bio: userRecord.bio,
            // login: userRecord.login,
            // email: userRecord.email,
            company: userRecord.company,
            location: userRecord.location,
            // isHireable: user.isHireable,
            profileImageUri: userRecord.profileImageUri,
            githubUri: userRecord.githubUri,
            // siteUri: userRecord.siteUri,
            providers: Object.keys(userRecord.providers),
            // stats: userRecord.stats,
        },
    };
}

module.exports = {
    'default': action,
};
