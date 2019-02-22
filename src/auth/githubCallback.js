'use strict';

const lambdaContext = require('../shared/lambdaContext');
const oauthClient = require('../shared/github/oauthClient');
const getUser = require('../shared/github/api/getUser');
const dataContext = require('../shared/mongodb/dataContext');

async function getTokens(uri) {
    const tokens = await oauthClient.code.getToken(uri);

    return tokens;
}

async function syncUserFromDb(user) {
    await dataContext(async (db) => {
        await db.collections('users').save({
            _id: user.id,
            type: user.type,
            name: user.name,
            bio: user.bio,
            username: user.login,
            email: user.email,
            company: user.company,
            location: user.location,
            hireable: user.hireable,
            profileImageUri: user.avatar_url,
            githubUri: user.html_url,
            blogUri: user.blog,
            stats: {
                repositoriesPublic: user.public_repos,
                followers: user.followers,
                following: user.following,
                collaborators: user.collaborators,
                createdAt: user.created_at,
                updatedAt: user.updated_at,
            },
        });
    });
}

const main = async (event, context) => lambdaContext(async () => {
    const tokens = await getTokens({
        query: event.queryStringParameters,
    });

    const user = await getUser(`token ${tokens.accessToken}`);
    await syncUserFromDb(user);

    return {
        tokenType: tokens.tokenType,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
    };
});

module.exports = {
    'default': main,
};
