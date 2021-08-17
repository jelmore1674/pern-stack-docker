const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI,
});

module.exports = {
    db,
};