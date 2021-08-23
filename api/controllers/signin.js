const bcrypt = require('bcrypt');
const auth = require('../utils/auth');

module.exports = {
    signinAuthentication: async(req, res) => {
        const { authorization } = req.headers;
        if (authorization) {
            const tokenId = await auth.getAuthTokenId(req, res);
            return tokenId;
        } else {
            const data = await auth.userSignin(req, res);
            console.log(data);
            if (data.id && data.email) {
                const session = await auth.createSessions(data);
                res.json(session);
            } else {
                console.log('whoops');
                // Promise.reject(data);
            }
        }
    },
};