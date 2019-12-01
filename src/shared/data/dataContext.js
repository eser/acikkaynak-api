const { MongoClient } = require('mongodb');

async function dataContext(func) {
    const client = await MongoClient.connect(
        process.env.MONGODB_CONNECTION_STRING,
        {
            useNewUrlParser: true,
        },
    );
    const db = client.db(process.env.MONGODB_DATABASE_NAME);

    const result = await func(db);

    client.close();

    return result;
}

module.exports = dataContext;
