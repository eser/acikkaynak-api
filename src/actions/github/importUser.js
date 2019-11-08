const lambdaContext = require('../_shared/lambdaContext');
const getUserRepositories = require('../_shared/github/api/getUserRepositories');
const syncRepositoryFromDb = require('../_shared/data/methods/syncRepositoryFromDb');
const queueAdd = require('../_shared/queue/add');

async function action(message) {
    console.log(message);

    const userRepositories = await getUserRepositories(message.accessToken);

    for (const userRepository of userRepositories) {
        const userRepositoryRecord = await syncRepositoryFromDb(
            userRepository,
            message.userId
        );

        await queueAdd(
            process.env.SQS_QUEUE_REPOSITORIES,
            {
                tokenType: message.tokenType,
                accessToken: message.accessToken,
                refreshToken: message.refreshToken,

                repositoryId: userRepositoryRecord._id.toString(),
                repositoryGithubId: userRepositoryRecord.githubId,
            }
        );
    }
}

function route(event) {
    return lambdaContext(
        () => action(JSON.parse(event.Records[0].body)),
    );
}

module.exports = {
    'default': route,
    'action': action,
};
