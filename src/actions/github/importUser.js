const getUserRepositories = require('../_shared/github/api/getUserRepositories');
const syncRepositoryFromDb = require('../_shared/data/methods/syncRepositoryFromDb');
const queueAdd = require('../_shared/queue/add');

async function processUserRepository(message, userRepository) {
    const userRepositoryRecord = await syncRepositoryFromDb(
        userRepository,
        message.userId,
    );

    await queueAdd(
        process.env.SQS_QUEUE_REPOSITORIES,
        {
            tokenType: message.tokenType,
            accessToken: message.accessToken,
            refreshToken: message.refreshToken,

            repositoryId: userRepositoryRecord._id.toString(),
            repositoryGithubId: userRepositoryRecord.githubId,
        },
    );
}

async function action(message) {
    console.log(message);

    const userRepositories = await getUserRepositories(message.accessToken);

    // eslint-disable-next-line no-restricted-syntax
    for (const userRepository of userRepositories) {
        // eslint-disable-next-line no-await-in-loop
        await processUserRepository(message, userRepository);
    }
}

module.exports = {
    'default': action,
};
