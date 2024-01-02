const express=require('express');
const router=express.Router();

const signinController = require('../controllers/signincontroller');

router.post('/',signinController);

module.exports=router;