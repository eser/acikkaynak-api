const sqsClient = require('./sqsClient');

function enqueueRepository(message) {
    return sqsClient.enqueue(
        process.env.SQS_QUEUE_REPOSITORIES,
        message,
    );
}

module.exports = enqueueRepository;
