const nodeFetch = require('node-fetch');

const newsUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/news.json';

async function action() {
    const newsListRequest = await nodeFetch(newsUrl);

    const newsList = await newsListRequest.json();

    return newsList;
}

module.exports = {
    'default': action,
};
