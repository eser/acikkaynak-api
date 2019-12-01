const dataContext = require('../dataContext');

function syncUserFromDb(user, provider, lastOptIn) {
    return dataContext(async (db) => {
        const providerKey = `providers.${provider}.id`;

        const fields = {
            $set: {
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
                [providerKey]: user.id,
                'stats.organizations': user.organizations.totalCount,
                'stats.repositories': user.repositories.totalCount,
                'stats.followers': user.followers.totalCount,
                'stats.following': user.following.totalCount,
                'stats.createdAt': user.createdAt,
                'stats.updatedAt': user.updatedAt,
            },
        };

        if (lastOptIn !== undefined) {
            fields.$set.lastOptIn = lastOptIn;
        }
        else {
            fields.$setOnInsert = { lastOptIn: lastOptIn };
        }

        const result = await db.collection('users').findOneAndUpdate(
            { [providerKey]: user.id },
            fields,
            {
                'upsert': true,
                'returnOriginal': false,
            },
        );

        // todo check if result.ok

        return result.value;
    });
}

module.exports = syncUserFromDb;
