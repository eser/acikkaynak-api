const graphql = require('@octokit/graphql');

async function getUserOrganizations(authToken, cursor) {
    let paging;

    if (cursor === undefined) {
        paging = '';
    }
    else {
        paging = ` after:${cursor}`;
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
            authorization: authToken,
        },
    });

    const result = response.viewer;

    return result;
}

module.exports = getUserOrganizations;
