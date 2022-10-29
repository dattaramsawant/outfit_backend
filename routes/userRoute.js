const express = require('express')
const router = express.Router()
const validate = require('../validator/validate')
const userValidation = require('../validator/userValidation')
const userController = require('../controller/userController')

router.route('/').get(userController.getAllUser);
router.route('/').post(userValidation.userValidator(),validate,userController.createUser)
router.route('/deleteUser').post(userController.deleteUser)
router.route('/restoreUser').post(userController.restoreUser)

module.exports = router