const actionRoot = require('./actions/index').default;
const actionGraphQL = require('./actions/graphql/index').default;
const actionAuthGitHub = require('./actions/auth/github').default;
const actionAuthGitHubCallback = require('./actions/auth/githubCallback').default;
const actionListsProjects = require('./actions/lists/projects/index').default;
const actionListsOrganizations = require('./actions/lists/organizations/index').default;
const actionGitHubProfile = require('./actions/github/profile').default;
// const actionGitHubImportUser = require('./actions/github/importUser').default;
// const actionGitHubImportOrganization = require('./actions/github/importOrganization').default;
// const actionGitHubImportRepository = require('./actions/github/importRepository').default;

function fixExceptionObjectResult(ex) {
    const serialized = JSON.stringify(ex, Object.getOwnPropertyNames(ex));

    return serialized;
}

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json; charset=utf-8',
};

async function fastifyContext(reply, func) {
    try {
        const result = await func();

        reply.headers(corsHeaders);

        return result;
    }
    catch (ex) {
        reply.code(500);
        reply.headers(corsHeaders);

        return fixExceptionObjectResult(ex);
    }
}

function router(server) {
    server.get('/', (request, reply) => fastifyContext(reply, () => actionRoot(request.headers)));

    server.get('/graphql', (request, reply) => fastifyContext(reply, () => actionGraphQL(request.body)));
    server.post('/graphql', (request, reply) => fastifyContext(reply, () => actionGraphQL(request.body)));

    server.get('/auth/github', (request, reply) => fastifyContext(reply, () => actionAuthGitHub()));
    server.get('/auth/githubCallback', (request, reply) => fastifyContext(reply, () => actionAuthGitHubCallback(request.query)));

    server.get('/lists/projects', (request, reply) => fastifyContext(reply, () => actionListsProjects()));
    server.get('/lists/organizations', (request, reply) => fastifyContext(reply, () => actionListsOrganizations()));

    server.get('/github/profile', (request, reply) => fastifyContext(reply, () => actionGitHubProfile(request.headers.Authorization)));
}

module.exports = router;
