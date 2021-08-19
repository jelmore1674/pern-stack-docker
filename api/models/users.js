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
    createUser: async(email, password, name) => {
        const hash = await bcrypt.hashSync(password);
        try {
            await db.transaction(async(trx) => {
                const loginEmail = await trx
                    .insert({
                        hash: hash,
                        email: email,
                    })
                    .into('login')
                    .returning('email');
                const newUser = await trx('users').returning('*').insert({
                    email: loginEmail[0],
                    name: name,
                    joined: new Date(),
                });
            });
        } catch (err) {
            res.stauts(400).json(err);
        }
    },
};