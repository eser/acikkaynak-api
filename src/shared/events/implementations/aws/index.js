const AWS = require('aws-sdk');

const sqs = new AWS.SQS();
const { AWS_REGION, AWS_ACCOUNT_ID } = process.env;


function errorHandlerWrapper(action) {
    try {
        return action();
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}

async function enqueueInternal(topic, payload) {
    const queueUrl = `https://sqs.${AWS_REGION}.amazonaws.com/${AWS_ACCOUNT_ID}/${topic}`;

    const params = {
        MessageBody: JSON.stringify(payload),
        QueueUrl: queueUrl,
    };

    const result = await sqs.sendMessage(params);

    return result;
}

function enqueue(...args) {
    return errorHandlerWrapper(() => enqueueInternal(...args));
}

async function dequeueInternal(topic, maxNumberOfMessages = 10) {
    const queueUrl = `https://sqs.${AWS_REGION}.amazonaws.com/${AWS_ACCOUNT_ID}/${topic}`;

    const params = {
        QueueUrl: queueUrl,
        MaxNumberOfMessages: maxNumberOfMessages,
    };

    const result = await sqs.receiveMessage(params);

    result.Messages = result.Messages.map(message => ({
        ...message,
        Body: JSON.parse(message.Body),
    }));

    return result;
}

function dequeue(...args) {
    return errorHandlerWrapper(() => dequeueInternal(...args));
}

module.exports = {
    enqueue,
    dequeue,
};
