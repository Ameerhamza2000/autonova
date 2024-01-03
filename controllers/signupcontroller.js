const bcrypt=require('bcrypt');
const User=require('../models/users');

const signupController=async(req,res)=>{
    try{
        console.log("signup route hit")
        let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).json({message:"User Already exist"});

    user=new User({
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password
    });

    const salt=await bcrypt.genSalt(10);
    user.password= await bcrypt.hash(user.password,salt);
    user=await user.save();
    
    const token=user.generateAuthToken();
    console.log("Signup Success")
    res.status(201).json({token:token,message:"SignUp Succesfully"});
}
catch(error){
    res.status(500).json({message:`Error while registering user ${error} `});
}
}

module.exports=signupController;