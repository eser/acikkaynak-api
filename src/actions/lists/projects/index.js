const nodeFetch = require('node-fetch');
const lambdaContext = require('../../_shared/lambdaContext');

const projectsUrl = 'https://raw.githubusercontent.com/acikkaynak/acikkaynak/master/projects.json';

async function action() {
    const projectListRequest = await nodeFetch(projectsUrl);

    const projectList = await projectListRequest.json();

    return projectList;
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
