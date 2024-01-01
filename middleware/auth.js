const jwt=require('jsonwebtoken');

function auth(req,res,next){
    const token=req.header('Authorization');
    if(!token){
        return res.status(401).send("Access Denied! no token");
    }

    try{
        const decoded= jwt.verify(token,process.env.SECRETKEY);
        req.user=decoded;
        next();
    }
    catch(err){
        res.status(403).send("Invalid Token ");
    }

};

module.exports=auth;


