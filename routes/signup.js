const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');

const User=require('../models/users');

router.post('/',async(req,res)=>{
    try{
        let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("User Already exist");

    user=new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    });

    const salt=await bcrypt.genSalt(10);
    user.password= await bcrypt.hash(user.password,salt);
    user=await user.save();

    const token=user.generateAuthToken();
    res.status(201).send(token);
}
catch(error){
    res.status(500).send("Error while registering user");
}
});

module.exports=router;