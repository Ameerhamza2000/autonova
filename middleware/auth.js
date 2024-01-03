const jwt=require('jsonwebtoken');

function auth(req,res,next){
    // bearer handler
    const headerToken=req.header('Authorization');
    const splittedToken=headerToken.split(" ");

    // token
    const token=splittedToken[1];
    if(!token){
        return res.status(401).json({message:"Access Denied! no token"});
    }

    try{
        const decoded= jwt.verify(token,process.env.SECRETKEY);
        req.user=decoded;
        next();
    }
    catch(err){
        console.log("Access denied! ", err)
        res.status(403).json({message:"Invalid Token "});
    }

};

module.exports=auth;


