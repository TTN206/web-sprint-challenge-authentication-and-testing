const db = require('../../data/dbConfig');

function findAll() {
    return db('users');
}

async function insert (newUser) {
    const [id] = await db('users').insert(newUser);
    return findById(id);
}

function findById(id) {
    return db('users').where({id}).first();
}

function findBy(filter) {
    return db("users").where(filter);
}


module.exports = {
    findAll,
    findById,
    insert,
    findBy
};