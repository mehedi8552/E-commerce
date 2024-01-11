const { DecodeTocken } = require("../Utility/TokenHelper")



module.exports = (req,res,next)=>{
    //console.log((req.headers.cookie).splice(0,5));
    let token = req.cookies.token;
    //console.log(token);

    let decoded = DecodeTocken(token);

    if(decoded===null){
        return res.status(401).json({status:"failed",message:"Unauthorized"})
    }
    else{
        let email=decoded['email'];
        let user_id = decoded['user_id'];
        req.headers.email= email;
        req.headers.user_id = user_id;
        next();
    }
}