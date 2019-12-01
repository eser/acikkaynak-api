const getUserRepositories = require('../_shared/github/methods/getUserRepositories');
const syncRepositoryFromDb = require('../_shared/data/methods/syncRepositoryFromDb');
const enqueueRepository = require('../_shared/queue/methods/enqueueRepository');

async function processUserRepository(message, userRepository) {
    const userRepositoryRecord = await syncRepositoryFromDb(
        userRepository,
        message.userId,
    );

    await enqueueRepository({
        tokenType: message.tokenType,
        accessToken: message.accessToken,
        refreshToken: message.refreshToken,

        repositoryId: userRepositoryRecord._id.toString(),
        repositoryGithubId: userRepositoryRecord.providers.github.id,
    });
}

async function action(message) {
    console.log(message);

    const userRepositories = await getUserRepositories(message.accessToken);

    const promises = userRepositories.map(
        userRepository => processUserRepository(message, userRepository),
    );

    return Promise.all(promises);
}

module.exports = {
    'default': action,
};
