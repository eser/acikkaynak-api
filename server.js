// eslint-disable-next-line strict, lines-around-directive
'use strict';

// Require the framework and route definitions
const fastify = require('fastify');
const dotenv = require('dotenv');

const router = require('./src/routerFastify');
// Instantiate the server and the router
dotenv.config();

const server = fastify({ logger: true });

router(server);

// Run the server!
async function start() {
    try {
        const address = '0.0.0.0'; // might also be ::
        const port = parseInt(process.env.PORT, 10);

        await server.listen(port, address);

        server.log.info(`server listening on ${server.server.address().port}`);
    }
    catch (err) {
        server.log.error(err);

        process.exit(1);
    }
}

start();
