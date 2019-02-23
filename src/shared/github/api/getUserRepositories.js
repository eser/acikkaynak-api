const nfetch = require('node-fetch');

async function getUserRepositories(authToken) {
    const response = await nfetch(
        'https://api.github.com/user/repos?visibility=public',
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

module.exports = getUserRepositories;
