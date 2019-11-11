const graphql = require('@octokit/graphql');

async function getUserRepositoriesSingle(authToken, cursor) {
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
            authorization: `token ${authToken}`,
        },
    });

    const result = response.viewer.repositories;

    return result;
}

async function getUserRepositories(authToken) {
    let result = [];
    let lastCursor; // will be initialized as undefined

    for (;;) {
        // eslint-disable-next-line no-await-in-loop
        const page = await getUserRepositoriesSingle(authToken, lastCursor);

        result = result.concat(page.nodes);

        if (!page.pageInfo.hasNextPage) {
            break;
        }

        lastCursor = page.pageInfo.endCursor;
    }

    return result;
}

module.exports = getUserRepositories;
