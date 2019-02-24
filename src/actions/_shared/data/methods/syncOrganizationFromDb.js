const dataContext = require('../dataContext');

function syncOrganizationFromDb(userOrganization) {
    return dataContext(async (db) => {
        const fields = {
            $set: {
                githubId: userOrganization.id,
                name: userOrganization.name,
                username: userOrganization.login,
                email: userOrganization.email,
                location: userOrganization.location,
                isVerified: userOrganization.isVerified,
                profileImageUri: userOrganization.avatarUrl,
                githubUri: userOrganization.url,
                siteUri: userOrganization.websiteUrl,
                stats: {
                    repositories: userOrganization.repositories.totalCount,
                    members: userOrganization.memberStatuses.totalCount,
                },
            },
        };

        const result = await db.collection('organizations').findOneAndUpdate(
            { githubId: userOrganization.id },
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

module.exports = syncOrganizationFromDb;
