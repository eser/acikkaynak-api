const graphql = require('@octokit/graphql');

async function getUserRepositories(authToken, cursor) {
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
              repositories(first: 100${paging}) {
                totalCount
                nodes {
                  id
                  owner {
                    __typename
                    id
                  }
                  name
                  description
                  homepageUrl
                  primaryLanguage {
                    id
                    name
                  }
                  licenseInfo {
                    id
                    name
                  }
                  isArchived
                  isFork
                  defaultBranchRef {
                    name
                  }
                  url
                  sshUrl
                  stargazers {
                    totalCount
                  }
                  watchers {
                    totalCount
                  }
                  collaborators {
                    totalCount
                  }
                  issues {
                    totalCount
                  }
                  createdAt
                  updatedAt
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

module.exports = getUserRepositories;
