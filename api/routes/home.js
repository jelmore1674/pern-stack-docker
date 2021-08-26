const express = require('express');
const router = express.Router();
const userController = require('../controllers/getUsers');
const signinController = require('../controllers/signin');
const registerController = require('../controllers/register');
// middleware that is specific to this router

router.get('/api', userController.getUsers);
router.post('/login', signinController.signinAuthentication);
router.get('/profile/:id', userController.getSingleUser);
router.post('/signup', registerController.handleRegister);

module.exports = router;