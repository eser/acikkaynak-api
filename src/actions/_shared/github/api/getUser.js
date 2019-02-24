const graphql = require('@octokit/graphql');

async function getUser(authToken) {
    const response = await graphql({
        query: `
          query {
            viewer {
              id
              name
              bio
              login
              email
              company
              location
              isHireable
              avatarUrl
              url
              websiteUrl
              organizations {
                totalCount
              }
              repositories {
                totalCount
              }
              followers {
                totalCount
              }
              following {
                totalCount
              }
              createdAt
              updatedAt
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

module.exports = getUser;
