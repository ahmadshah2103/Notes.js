const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateSignup = require('../middlewares/validateSignup');

router.post('', validateSignup, userController.signup);

module.exports = router;