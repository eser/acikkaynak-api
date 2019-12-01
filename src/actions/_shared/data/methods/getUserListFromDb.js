const dataContext = require('../dataContext');

function getUserListFromDb() {
    return dataContext(async (db) => {
        const result = await db.collection('users').find({
        });

        // todo check if result.ok

        return result.toArray();
    });
}

module.exports = getUserListFromDb;
