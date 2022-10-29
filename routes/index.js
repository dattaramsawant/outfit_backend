const express = require('express');
const router = express.Router();

const user=require('./userRoute')
const auth=require('./authRoute')

router.use('/user',user)
router.use('/auth',auth)

module.exports = router;