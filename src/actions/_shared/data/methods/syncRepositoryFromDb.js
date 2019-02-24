const dataContext = require('../dataContext');

function syncRepositoryFromDb(userRepository, owner) {
    return dataContext(async (db) => {
        const fields = {
            $set: {
                githubId: userRepository.id,
                owner: owner,
                ownerGithubId: (userRepository.owner !== undefined) ? userRepository.owner.id : null,
                name: userRepository.name,
                description: userRepository.description,
                homepage: userRepository.homepageUrl,
                language: (userRepository.primaryLanguage !== undefined) ? userRepository.primaryLanguage.id : null,
                license: (userRepository.licenseInfo !== undefined) ? userRepository.licenseInfo.id : null,
                isArchived: userRepository.isArchived,
                isFork: userRepository.isFork,
                defaultBranch: (userRepository.defaultBranchRef !== undefined) ? userRepository.defaultBranchRef.name : null,
                githubUri: userRepository.url,
                sshUri: userRepository.sshUrl,
                stats: {
                    stars: userRepository.stargazers.totalCount,
                    watches: userRepository.watchers.totalCount,
                    forks: userRepository.forkCount,
                    collaborators: userRepository.collaborators.totalCount,
                    issues: userRepository.issues.totalCount,
                    createdAt: userRepository.createdAt,
                    updatedAt: userRepository.updatedAt,
                },
            },
        };

        const result = await db.collection('repositories').findOneAndUpdate(
            { githubId: userRepository.id },
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

module.exports = syncRepositoryFromDb;
