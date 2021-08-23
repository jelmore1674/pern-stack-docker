const userModel = require('../models/users');

module.exports = {
    uploadImage: (req, res, next) => {
        const {
            file,
            body: { name },
        } = req;
        console.log(file.path);
        res.send('File uploaded');
    },
    changeAvatar: async(req, res, next) => {
        const {
            file,
            params: { id },
        } = req;
        const user = await userModel.changeAvatar(id, file.path);
        res.json(user);
    },
};