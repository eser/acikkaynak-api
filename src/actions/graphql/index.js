const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
    type User {
        name: String
    }

    type Query {
        user(id: String): User
    }
`);

async function action(query) {
    // Provide resolver functions for your schema fields
    const root = {
        user: props => ({ name: `u-${props.id}` }),
    };

    const result = await graphql(schema, query, root);

    return result;
}

module.exports = {
    'default': action,
};
