const nodeFetch = require('node-fetch');

const eventsUrl = 'https://api.kommunity.com/api/v1/acikkaynak?with[]=events&with[]=members&with[]=city&with[]=country';

async function action() {
    const fetchOptions = {
        credentials: 'include',
        headers: {
            'accept': 'application/json',
        },
        method: 'GET',
    };

    const eventsListRequest = await nodeFetch(eventsUrl, fetchOptions);

    const eventsList = await eventsListRequest.json();

    return eventsList;
}

module.exports = {
    'default': action,
};
