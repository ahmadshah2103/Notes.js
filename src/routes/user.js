const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateSignup = require('../middlewares/validateSignup');
const validateSignin = require('../middlewares/validateSignin');

router.post('', validateSignup, userController.signup);
router.post('/signin', validateSignin, userController.signin);

module.exports = router;