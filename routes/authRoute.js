const express = require('express')
const router = express.Router()
const authController = require('../controller/authController');
const loginLimiter = require('../middleware/loginLimiter');
const authValidator = require('../validator/authValidator')
const validate = require('../validator/validate')

router.route('/login').post(loginLimiter,authValidator.authValidator(),validate,authController.login);

router.route('/refresh').post(authController.refresh);

router.route('/logout').post(authController.logout);

module.exports = router