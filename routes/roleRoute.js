const express = require('express')
const router = express.Router()
const roleController=require("../controller/roleController")
const roleValidator=require('../validator/roleValidator')
const validator=require('../validator/validate')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/').post(roleValidator.roleValidator(),validator,roleController.addRole)
router.route('/').get(roleController.getRole)

module.exports=router