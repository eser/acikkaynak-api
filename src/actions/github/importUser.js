const getUserRepositories = require('../_shared/github/api/getUserRepositories');
const syncUserFromDb = require('../_shared/data/methods/syncUserFromDb');
const syncRepositoryFromDb = require('../_shared/data/methods/syncRepositoryFromDb');
const queueAdd = require('../_shared/queue/add');

async function main(message) {
    const processedUserIds = {
        [message.userGithubId]: message.userId,
    };

    const userRepositories = await getUserRepositories(message.accessToken);

    for (const userRepository of userRepositories) {
        if (userRepository.owner !== undefined && !(userRepository.owner.id in processedUserIds)) {
            const ownerUserRecord = await syncUserFromDb(false, userRepository.owner);

            processedUserIds[userRepository.owner.id] = ownerUserRecord._id.toString();
        }

        const userId = processedUserIds[userRepository.owner.id];

        await syncRepositoryFromDb(
            userId,
            userRepository
        );

        await queueAdd(
            process.env.SQS_QUEUE_REPOSITORIES,
            {
                tokenType: tokens.tokenType,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,

                userId: userId,
                repositoryId: userRepository._id.toString(),
            }
        );
    }
}

module.exports = main;
