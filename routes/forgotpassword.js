const express = require('express');
const router = express.Router();
const forgotController = require('../controllers/forgotpassword');

router.post('/',forgotController );

module.exports=router;