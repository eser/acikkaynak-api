const { graphql, buildSchema } = require('graphql');

const getUserFromDb = require('../_shared/data/methods/getUserFromDb');
const getUserListFromDb = require('../_shared/data/methods/getUserListFromDb');

const schema = buildSchema(`
    type User {
        _id: ID
        bio: String
        company: String
        githubUri: String
        location: String
        name: String
        profileImageUri: String
    }

    type Query {
        user(id: ID): User
        users: [User]
    }
`);

async function getUser(props) {
    const result = await getUserFromDb(props.id);

    return result;
}

async function getUserList(props, cursor) {
    const result = await getUserListFromDb();

    return result;
}

async function action(query) {
    // Provide resolver functions for your schema fields
    const root = {
        user: getUser,
        users: getUserList,
    };

    const result = await graphql(schema, query, root);

    return result;
}

module.exports = {
    'default': action,
};
