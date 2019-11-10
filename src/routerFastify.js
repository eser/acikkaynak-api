const actionRoot = require('./actions/index').default;
// const actionGraphQL = require('./actions/graphql/index').default;
// const actionAuthGitHub = require('./actions/auth/github').default;
// const actionAuthGitHubCallback = require('./actions/auth/githubCallback').default;
// const actionListsProjects = require('./actions/lists/projects/index').default;
// const actionListsOrganizations = require('./actions/lists/organizations/index').default;
// const actionGitHubProfile = require('./actions/github/profile').default;
// const actionGitHubImportUser = require('./actions/github/importUser').default;
// const actionGitHubImportOrganization = require('./actions/github/importOrganization').default;
// const actionGitHubImportRepository = require('./actions/github/importRepository').default;

function fixExceptionObjectResult(ex) {
    const serialized = JSON.stringify(ex, Object.getOwnPropertyNames(ex));

    return serialized;
}

// const corsHeaders = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Credentials': true,
// };

async function fastifyContext(func) {
    try {
        const result = await func();

        // return {
        //     statusCode: 200,
        //     headers: corsHeaders,
        //     body: result !== undefined ?
        //         JSON.stringify(result) :
        //         undefined,
        // };
        return result;
    }
    catch (ex) {
        // return {
        //     statusCode: 500,
        //     headers: corsHeaders,
        //     body: fixExceptionObjectResult(ex),
        // };
        return fixExceptionObjectResult(ex);
    }
}

function router(server) {
    // request, reply
    server.get('/', request => fastifyContext(() => actionRoot(request.headers)));
}

module.exports = router;
