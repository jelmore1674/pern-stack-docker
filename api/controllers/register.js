const userModel = require('../models/users');

module.exports = {
    handleRegister: async(req, res) => {
        const { email, name, password } = req.body;
        if (!email || !name || !password) {
            res.status(400).json('incorrect form submission');
        } else {
            const newUser = await userModel.createUser(email, password, name);
            console.log(newUser);
            res.json(newUser);
        }
    },
};