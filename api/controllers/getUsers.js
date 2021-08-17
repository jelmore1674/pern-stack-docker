const userModel = require('../models/users');
const bcrypt = require('bcrypt');

module.exports = {
    getUsers: async(req, res) => {
        const users = await userModel.getAllUsers();
        res.json(...users);
    },

    getSingleUser: async(req, res) => {
        const { id } = req.params;
        const user = await userModel.getSingleUsers(id);
        res.json(user);
    },

    userSignIn: async(req, res) => {
        const { email, password } = req.body;
        const data = await userModel.getUserByEmail(email);
        const isValid = await bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
            try {
                const user = await userModel.getUserByEmail(email);
                return res.json('Signed In');
            } catch (err) {
                res.json(err);
            }
        } else {
            res.json('wrong credentials');
        }
    },
};