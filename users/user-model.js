const database = require('../database/dbConfig');

function addUser(user)
{
    return database('users').insert(user, 'id')
    .then(ids =>
    {
        const [id] = ids;
        return findUserById(id)
    })
}

function findUserById(id)
{
    return database('users').where({id}).first();
}

function findUser(user)
{
    return database('users').where(user).first();
}

module.exports = {
    addUser,
    findUserById,
    findUser
}