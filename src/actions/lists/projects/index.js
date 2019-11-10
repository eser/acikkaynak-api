const nodeFetch = require('node-fetch');

const projectsUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/projects.json';

async function action() {
    const projectListRequest = await nodeFetch(projectsUrl);

    const projectList = await projectListRequest.json();

    return projectList;
}

module.exports = {
    'default': action,
};
