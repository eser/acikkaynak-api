const dataContext = require('../dataContext');

async function syncUserFromDb(user, loggedIn) {
    await dataContext(async (db) => {
        const fields = {
            $set: {
                githubId: user.id,
                type: user.type,
                name: user.name,
                bio: user.bio,
                username: user.login,
                email: user.email,
                company: user.company,
                location: user.location,
                hireable: user.hireable,
                profileImageUri: user.avatar_url,
                githubUri: user.html_url,
                blogUri: user.blog,
                stats: {
                    repositoriesPublic: user.public_repos,
                    followers: user.followers,
                    following: user.following,
                    collaborators: user.collaborators,
                    createdAt: user.created_at,
                    updatedAt: user.updated_at,
                },
            },
        };

        if (loggedIn) {
            fields.$set.loggedIn = true;
        }
        else {
            fields.$setOnInsert = { loggedIn: loggedIn };
        }

        await db.collection('users').updateOne(
            { githubId: user.id },
            fields,
            {
                upsert: true,
                w: 1,
            }
        );
    });
}

module.exports = syncUserFromDb;
