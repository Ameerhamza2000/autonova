const bcrypt=require('bcrypt');
const User=require('../models/users');

const signinController=async(req,res)=>{
    try{ 
     const user= await User.findOne({email:req.body.email});
     if(!user) return res.status(404).json({message:"User not found"});
 
     const isValid= await bcrypt.compare(req.body.password,user.password);
     if(!isValid) return res.status(401).json({message:"Invalid username or Password!"});
 
     const token=user.generateAuthToken();
     console.log("SignIn Success");
     res.status(200).json({token:token,message:"SignIn Successfully"});
 }
 catch(error){
     res.status(400).json({message:"SignIn Failed",error});
 }
 
 }

 module.exports = signinController;