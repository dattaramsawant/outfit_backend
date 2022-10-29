const express = require('express')
const router = express.Router()
const authController = require('../controller/authController');
const loginLimiter = require('../middleware/loginLimiter');

router.route('/login').post(loginLimiter,authController.login);

router.route('/refresh').post(authController.refresh);

router.route('/logout').post(authController.logout);

module.exports = router