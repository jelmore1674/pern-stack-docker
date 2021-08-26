const db = require('./knex').db;
const bcrypt = require('bcrypt');

module.exports = {
    getAllUsers: async() => {
        const allUsers = await db('users').select('*');
        return allUsers;
    },

    getSingleUsers: async(id) => {
        const user = await db.select('*').from('users').where('id', '=', id);
        return user[0];
    },
    getSingleUserByEmail: async(email) => {
        const user = await db.select('*').from('users').where('email', email);
        return user[0];
    },

    getUserByEmail: async(email) => {
        const user = await db('login')
            .select('email', 'hash')
            .where('email', '=', email);
        return user[0];
    },
    createUser: async(email, password, name) => {
        const hash = await bcrypt.hashSync(password, 10);
        try {
            const registerUser = await db.transaction(async(trx) => {
                const loginEmail = await trx
                    .insert({
                        hash: hash,
                        email: email,
                    })
                    .into('login')
                    .returning('email')
                    .transacting(trx);
                const newUser = await trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        imageurl: 'uploads/images/default.png',
                    })
                    .transacting(trx);
                return newUser[0];
            });

            return registerUser;
        } catch (err) {
            return err;
        }
    },
    changeAvatar: async(id, imageUrl) => {
        const user = await db('users')
            .update({ imageurl: imageUrl })
            .where('id', id)
            .returning('*');
        return user[0];
    },
};