const { ObjectID } = require('mongodb');
const dataContext = require('../dataContext');

function getUserFromDb(id) {
    return dataContext(async (db) => {
        const result = await db.collection('users').findOne(
            { _id: ObjectID(id) }
        );

        // todo check if result.ok

        return result;
    });
}

module.exports = getUserFromDb;
