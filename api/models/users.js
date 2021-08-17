const db = require('./knex').db;

module.exports = {
    getAllUsers: async() => {
        const allUsers = await db('users').select('*');
        return allUsers;
    },

    getSingleUsers: async(id) => {
        const user = await db.select('*').from('users').where('id', '=', id);
        return user[0];
    },
    getUserByEmail: async(email) => {
        const user = await db('login')
            .select('email', 'hash')
            .where('email', '=', email);
        return user;
    },
};