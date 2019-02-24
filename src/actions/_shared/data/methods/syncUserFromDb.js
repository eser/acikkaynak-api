const dataContext = require('../dataContext');

function syncUserFromDb(user, loggedIn) {
    return dataContext(async (db) => {
        const fields = {
            $set: {
                githubId: user.id,
                name: user.name,
                bio: user.bio,
                username: user.login,
                email: user.email,
                company: user.company,
                location: user.location,
                isHireable: user.isHireable,
                profileImageUri: user.avatarUrl,
                githubUri: user.url,
                siteUri: user.websiteUrl,
                stats: {
                    organizations: user.organizations.totalCount,
                    repositories: user.repositories.totalCount,
                    followers: user.followers.totalCount,
                    following: user.following.totalCount,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            },
        };

        if (loggedIn) {
            fields.$set.loggedIn = true;
        }
        else {
            fields.$setOnInsert = { loggedIn: loggedIn };
        }

        const result = await db.collection('users').findOneAndUpdate(
            { githubId: user.id },
            fields,
            {
                'upsert': true,
                'new': true,
                'w': 1,
            }
        );

        // todo check if result.ok

        return result.value;
    });
}

module.exports = syncUserFromDb;
