const kafka = require('./implementations/kafka/index');
const aws = require('./implementations/aws/index');

function selectedBroker() {
    if (process.env.USE_KAFKA === '1') {
        return kafka;
    }

    return aws;
}

function publishUsersUpdate(payload) {
    return selectedBroker().enqueue(
        'USERS_UPDATE',
        payload,
    );
}

function processRepository(payload) {
    return selectedBroker().enqueue(
        'PROCESS_REPOSITORY',
        payload,
    );
}

module.exports = {
    'default': selectedBroker,
    publishUsersUpdate,
    processRepository,
};
