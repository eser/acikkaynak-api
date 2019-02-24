const getUserRepositories = require('../_shared/github/api/getUserRepositories');
const syncUserFromDb = require('../_shared/data/methods/syncUserFromDb');
const syncRepositoryFromDb = require('../_shared/data/methods/syncRepositoryFromDb');
const queueAdd = require('../_shared/queue/add');

async function main() {
    // const processedUserIds = { [user.id]: userRecord._id };

    // const userRepositories = await getUserRepositories(accessToken);

    // for (const userRepository of userRepositories) {
    //     if (userRepository.owner !== undefined && !(userRepository.owner.id in processedUserIds)) {
    //         const ownerUserRecord = await syncUserFromDb(false, userRepository.owner);

    //         processedUserIds[userRepository.owner.id] = ownerUserRecord._id;
    //     }

    //     await syncRepositoryFromDb(
    //         processedUserIds[userRepository.owner.id],
    //         userRepository
    //     );

    //     await queueAdd(
    //         process.env.SQS_QUEUE_REPOSITORIES,
    //         {
    //             tokenType: tokens.tokenType,
    //             accessToken: tokens.accessToken,
    //             refreshToken: tokens.refreshToken,

    //             userId: userRecord._id,
    //         }
    //     );
    // }
}

module.exports = main;
