const graphql = require('@octokit/graphql');

async function getUserOrganizationsSingle(authToken, cursor) {
    let paging;

    if (cursor === undefined) {
        paging = '';
    }
    else {
      paging = ` after: "${cursor}"`;
    }

    const response = await graphql({
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
    let lastCursor = undefined;

    for (;;) {
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
