const lambdaContext = require('../_shared/lambdaContext');
const getUser = require('../_shared/github/api/getUser');

async function action(authorizationHeader) {
    const user = await getUser(authorizationHeader);

    return user;
}

function route(event) {
    return lambdaContext(
        () => action(event.headers.Authorization),
    );
}

module.exports = {
    'default': route,
    'action': action,
};
