const express = require('express');
const router = express.Router();

const user=require('./userRoute')
const auth=require('./authRoute')
const role=require('./roleRoute')

router.use('/user',user)
router.use('/auth',auth)
router.use('/role',role)

module.exports = router;