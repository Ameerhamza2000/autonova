const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');

const User=require('../models/users');

router.post('/',async(req,res)=>{
   try{ 
    const user= await User.findOne({email:req.body.email});
    if(!user) return res.status(404).send("User not found");

    const isValid= await bcrypt.compare(req.body.password,user.password);
    if(!isValid) return res.status(401).send("Invalid username or Password!");

    const token=user.generateAuthToken();
    res.status(200).json({token});
}
catch(error){
    res.status(400).json({error});
}

});

module.exports=router;