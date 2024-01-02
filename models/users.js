const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.methods.generateAuthToken=function(){
    try{
        const token = jwt.sign({_id:this._id,userName:this.userName},process.env.SECRETKEY);
    return token;
    }
    catch(error){
        res.status(400).send("Error while genrating token", error)
    }
}

const User= mongoose.model('user',userSchema);

module.exports=User;