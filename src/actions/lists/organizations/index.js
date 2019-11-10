const nodeFetch = require('node-fetch');

const organizationsUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/organizations.json';

async function action() {
    const organizationListRequest = await nodeFetch(organizationsUrl);

    const organizationList = await organizationListRequest.json();

    return organizationList;
}

module.exports = {
    'default': action,
};
