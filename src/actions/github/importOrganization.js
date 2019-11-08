const lambdaContext = require('../_shared/lambdaContext');

async function action(message) {
    console.log(message);
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
