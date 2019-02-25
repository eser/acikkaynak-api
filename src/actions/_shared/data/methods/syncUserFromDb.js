const dataContext = require('../dataContext');

function syncUserFromDb(user, isLoggedIn) {
    return dataContext(async (db) => {
        const fields = {
            $set: {
                'githubId': user.id,
                'name': user.name,
                'bio': user.bio,
                'login': user.login,
                'email': user.email,
                'company': user.company,
                'location': user.location,
                'isHireable': user.isHireable,
                'profileImageUri': user.avatarUrl,
                'githubUri': user.url,
                'siteUri': user.websiteUrl,
                'stats.organizations': user.organizations.totalCount,
                'stats.repositories': user.repositories.totalCount,
                'stats.followers': user.followers.totalCount,
                'stats.following': user.following.totalCount,
                'stats.createdAt': user.createdAt,
                'stats.updatedAt': user.updatedAt,
            },
        };

        if (isLoggedIn) {
            fields.$set.isLoggedIn = true;
        }
        else {
            fields.$setOnInsert = { isLoggedIn: isLoggedIn };
        }

        const result = await db.collection('users').findOneAndUpdate(
            { githubId: user.id },
            fields,
            {
                'upsert': true,
                'returnOriginal': false,
            }
        );

        // todo check if result.ok

        return result.value;
    });
}

module.exports = syncUserFromDb;
