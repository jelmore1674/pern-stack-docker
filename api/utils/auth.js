require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URI);
const userModel = require('../models/users');

function signToken(email) {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: '2 days',
    });
}

const setToken = (key, value) => {
    return Promise.resolve(redisClient.set(key, value));
};
module.exports = {
    getAuthTokenId: (req, res) => {
        const { authorization } = req.headers;
        redisClient.get(authorization, (err, reply) => {
            if (err || !reply) {
                return res.status(400).json('Unauthorized');
            } else {
                res.json({ id: reply });
            }
        });
    },

    createSessions: (user) => {
        // Create JWT, return user data
        const { email, id } = user;
        const token = signToken(email);
        return setToken(token, id)
            .then(() => {
                return { success: true, userId: id, token };
            })
            .catch(console.log);
    },
    userSignin: async(req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return Promise.reject('incorrect form submission');
        }
        const data = await userModel.getUserByEmail(email);
        if (data) {
            const isValid = await bcrypt.compareSync(password, data.hash);
            if (isValid) {
                const user = await userModel.getSingleUserByEmail(email);
                return user;
            }
        } else {
            return Promise.reject('Wrong Credentials');
        }
    },
};