const snsClient = require('../snsClient');

function publishUsersUpdate(message) {
    // eslint-disable-next-line newline-before-return
    return snsClient.publish(
        process.env.SNS_UPDATE_USERS,
        message,
    );
}

module.exports = publishUsersUpdate;
