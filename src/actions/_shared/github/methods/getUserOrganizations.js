const graphql = require('@octokit/graphql');

async function getUserOrganizationsSingle(authToken, cursor) {
    let paging;

    if (cursor === undefined) {
        paging = '';
    }
    else {
        paging = ` after: "${cursor}"`;
    }

    const response = await graphql.graphql({
        query: `
          query {
            viewer {
              organizations(first: 100${paging}) {
                totalCount
                nodes {
                  id
                  name
                  login
                  email
                  location
                  isVerified
                  avatarUrl
                  url
                  websiteUrl
                  repositories {
                    totalCount
                  }
                  memberStatuses {
                    totalCount
                  }
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
              }
            }
          }
        `,
        headers: {
            authorization: `token ${authToken}`,
        },
    });

    const result = response.viewer.organizations;

    return result;
}

async function getUserOrganizations(authToken) {
    let result = [];
    let lastCursor; // will be initialized as undefined

    for (;;) {
        // eslint-disable-next-line no-await-in-loop
        const page = await getUserOrganizationsSingle(authToken, lastCursor);

        result = result.concat(page.nodes);

        if (!page.pageInfo.hasNextPage) {
            break;
        }

        lastCursor = page.pageInfo.endCursor;
    }

    return result;
}

module.exports = getUserOrganizations;
