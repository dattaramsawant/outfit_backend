const express = require('express');
const router = express.Router();

router.use('/',(req,res)=>{
  res.end('first route')
})

module.exports = router;