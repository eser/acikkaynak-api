const getUserRepositories = require('../../shared/github/methods/getUserRepositories');
const syncRepositoryFromDb = require('../../shared/data/methods/syncRepositoryFromDb');
const { processRepository } = require('../../shared/events/index');

async function processUserRepository(message, userRepository) {
    const userRepositoryRecord = await syncRepositoryFromDb(
        userRepository,
        message.userId,
    );

    await processRepository({
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
