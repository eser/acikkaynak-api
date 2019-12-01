const dataContext = require('../dataContext');

function syncOrganizationFromDb(userOrganization) {
    return dataContext(async (db) => {
        const fields = {
            $set: {
                'name': userOrganization.name,
                'login': userOrganization.login,
                'email': userOrganization.email,
                'location': userOrganization.location,
                'isVerified': userOrganization.isVerified,
                'profileImageUri': userOrganization.avatarUrl,
                'githubUri': userOrganization.url,
                'siteUri': userOrganization.websiteUrl,
                'providers.github.id': userOrganization.id,
                'stats.repositories': userOrganization.repositories.totalCount,
                'stats.members': userOrganization.memberStatuses.totalCount,
            },
        };

        const result = await db.collection('organizations').findOneAndUpdate(
            { 'providers.github.id': userOrganization.id },
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

module.exports = syncOrganizationFromDb;
