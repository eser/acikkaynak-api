const { ApolloServer, gql } = require('apollo-server-lambda');
const lambdaContext = require('../_shared/lambdaContext');

function action() {
    // Construct a schema, using GraphQL schema language
    const typeDefs = gql`
type Query {
    hello: String
}
    `;

    // Provide resolver functions for your schema fields
    const resolvers = {
        Query: {
            hello: () => 'Hello world!',
        },
    };

    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
        context: ({ event, context }) => ({
            headers: event.headers,
            functionName: context.functionName,
            event: event,
            context: context,
        }),
    });

    const handler = server.createHandler({
        cors: {
            origin: '*',
            credentials: true,
        },
    });

    return handler;
}

function route() { // event
    return lambdaContext(
        () => action(), // event.headers.Authorization
    );
}

module.exports = {
    'default': route,
    'action': action,
};
