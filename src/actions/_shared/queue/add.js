const AWS = require('aws-sdk');

async function add(topic, message) {
    const sqs = new AWS.SQS();

    const params = {
        MessageBody: JSON.stringify(message),
        QueueUrl: topic,
        DelaySeconds: 0,
    };

    const result = await sqs.sendMessage(params).promise();

    return result;
}

module.exports = add;
