const nodeFetch = require('node-fetch');
const lambdaContext = require('../../_shared/lambdaContext');

const organizationsUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/organizations.json';

async function action() {
    const organizationListRequest = await nodeFetch(organizationsUrl);

    const organizationList = await organizationListRequest.json();

    return organizationList;
}

function route() {
    return lambdaContext(
        () => action(),
    );
}

module.exports = {
    'default': route,
    'action': action,
};
