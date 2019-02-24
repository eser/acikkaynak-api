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
                homepage: userRepository.homepage,
                language: userRepository.language,
                license: userRepository.license,
                archived: userRepository.archived,
                fork: userRepository.fork,
                defaultBranch: userRepository.default_branch,
                githubUri: userRepository.html_url,
                gitUri: userRepository.git_url,
                sshUri: userRepository.ssh_url,
                cloneUri: userRepository.clone_url,
                stats: {
                    stars: userRepository.stargazers_count,
                    watches: userRepository.watchers_count,
                    forks: userRepository.forks_count,
                    openIssues: userRepository.open_issues_count,
                    createdAt: userRepository.created_at,
                    updatedAt: userRepository.updated_at,
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
