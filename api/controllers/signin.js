const bcrypt = require('bcrypt');
const auth = require('../utils/auth');

module.exports = {
    signinAuthentication: async(req, res) => {
        const { authorization } = req.headers;
        if (authorization) {
            try {
                const tokenId = await auth.getAuthTokenId(req, res);
                return tokenId;
            } catch (err) {
                res.status(500).json({ message: err });
            }
        } else {
            try {
                const data = await auth.userSignin(req, res);
                if (data.id && data.email) {
                    const session = await auth.createSessions(data);
                    res.status(202).json(session);
                } else {
                    Promise.reject(data);
                }
            } catch (err) {
                res.status(401).json(err);
                console.log(err);
            }
        }
    },
};