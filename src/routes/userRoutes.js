const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const {validateSignup, validateSignin, validateAuthenticateWithGoogle} = require('../middlewares/validateAuthentication');

router.post('', validateSignup, userController.signup);
router.post('/signin', validateSignin, userController.signin);
router.post('/google_auth', validateAuthenticateWithGoogle, userController.authenticateWithGoogle);

module.exports = router;