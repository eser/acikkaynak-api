const nfetch = require('node-fetch');

async function getUser(authToken) {
    const response = await nfetch(
        'https://api.github.com/user',
        {
            method: 'GET',
            // body: JSON.stringify(),
            headers: {
                Authorization: authToken,
            },
        }
    );

    const result = await response.json();

    return result;
}

module.exports = getUser;
