
const jwt = require('jsonwebtoken');

exports.EncodeTocken=(email,user_id)=>{
    let KEY   = "123-ABC-XYZ";
    let EXPAIRE = {expiresIn:'24h'};
    let PAYLOAD = {email:email,user_id:user_id};
    return jwt.sign(PAYLOAD,KEY,EXPAIRE);
}

exports.DecodeTocken =(token)=>{
    try{
        let KEY   = "123-ABC-XYZ";
        return jwt.verify(token,KEY)
    }catch(e){
        return null
    }
}