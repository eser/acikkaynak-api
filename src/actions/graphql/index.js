const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
type Query {
    hello: String
}
`);

async function action(query) {
    // Provide resolver functions for your schema fields
    const resolvers = {
        // user: props => ({ name: `u${props.id}` }),
        hello: () => 'Hello world',
    };

    const query_ = JSON.parse(query);

    const result = await graphql(schema, query_, resolvers);

    return result;
}

module.exports = {
    'default': action,
};
