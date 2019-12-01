const { ObjectID } = require('mongodb');
const dataContext = require('../dataContext');

function syncRepositoryFromDb(userRepository, owner) {
    return dataContext(async (db) => {
        const fields = {
            $set: {
                'owner': ObjectID(owner),
                'name': userRepository.name,
                'description': userRepository.description,
                'homepage': userRepository.homepageUrl,
                'language': (userRepository.primaryLanguage !== undefined) ? userRepository.primaryLanguage.id : null,
                'license': (userRepository.licenseInfo !== undefined) ? userRepository.licenseInfo.id : null,
                'isArchived': userRepository.isArchived,
                'isFork': userRepository.isFork,
                'defaultBranch': (userRepository.defaultBranchRef !== undefined) ? userRepository.defaultBranchRef.name : null,
                'githubUri': userRepository.url,
                'sshUri': userRepository.sshUrl,
                'providers.github.id': userRepository.id,
                'providers.github.ownerId': (userRepository.owner !== undefined) ? userRepository.owner.id : null,
                'stats.stars': userRepository.stargazers.totalCount,
                'stats.watches': userRepository.watchers.totalCount,
                'stats.forks': userRepository.forkCount,
                'stats.collaborators': userRepository.collaborators.totalCount,
                'stats.issues': userRepository.issues.totalCount,
                'stats.createdAt': userRepository.createdAt,
                'stats.updatedAt': userRepository.updatedAt,
            },
        };

        const result = await db.collection('repositories').findOneAndUpdate(
            { 'providers.github.id': userRepository.id },
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

module.exports = syncRepositoryFromDb;
