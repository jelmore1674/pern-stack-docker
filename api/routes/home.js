const express = require('express');
const router = express.Router();
const userController = require('../controllers/getUsers');
// middleware that is specific to this router

router.get('/', userController.getUsers);
router.post('/', userController.userSignIn);
router.get('/:id', userController.getSingleUser);

module.exports = router;