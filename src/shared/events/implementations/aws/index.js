const AWS = require('aws-sdk');

const sqs = new AWS.SQS();
const { AWS_REGION, AWS_ACCOUNT_ID } = process.env;

async function enqueue(topic, payload) {
    const QueueUrl = `https://sqs.${AWS_REGION}.amazonaws.com/${AWS_ACCOUNT_ID}/${topic}`;

    const params = {
        MessageBody: JSON.stringify(payload),
        QueueUrl: QueueUrl,
    };

    try {
        const result = await sqs.sendMessage(params);

        return result;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}

async function dequeue(topic, MaxNumberOfMessages = 10) {
    const QueueUrl = `https://sqs.${AWS_REGION}.amazonaws.com/${AWS_ACCOUNT_ID}/${topic}`;

    const params = {
        QueueUrl,
        MaxNumberOfMessages,
    };

    try {
        const result = await sqs.receiveMessage(params);

        result.Messages = result.Messages.map(_ => ({
            ..._,
            Body: JSON.parse(_.Body),
        }));

        return result;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = {
    enqueue,
    dequeue,
};
