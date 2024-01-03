const express=require('express');
const vehicleController = require('../controllers/vehiclecontroller');
const router=express.Router();

router.post('/',vehicleController);

module.exports=router;