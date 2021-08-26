const userModel = require('../models/users');

module.exports = {
    getUsers: async(req, res) => {
        const users = await userModel.getAllUsers();
        res.status(202).json(...users);
    },

    getSingleUser: async(req, res) => {
        const { id } = req.params;
        const user = await userModel.getSingleUsers(id);
        res.status(202).json(user);
    },
};