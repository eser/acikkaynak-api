const AWS = require('aws-sdk');

async function publish(topic, message) {
    const options = {};

    if (process.env.IS_OFFLINE) {
        options.endpoint = 'http://127.0.0.1:4002';
    }

    const sns = new AWS.SNS(options);

    const params = {
        TopicArn: topic,
        Message: JSON.stringify({
            'default': message,
        }),
        // MessageStructure: 'json',
        // Subject: message,
    };

    const result = await sns.publish(params).promise();

    return result;
}

module.exports = {
    'publish': publish,
};
