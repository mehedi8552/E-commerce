const EmailSend = require("../Utility/EmailHelper");
const UserModel = require('../Models/UserModel');
const ProfileModel = require('../Models/ProfileModel');
const { EncodeTocken } = require("../Utility/TokenHelper");


const UserOTPService = async (req)=>{

try{
    let email = req.params.email;
    let Code = Math.floor(100000+Math.random()*900000);
    let EmailText = `Your Verification Code is:${Code}`;
    let EmailSubject = "Email Verification."
    await  EmailSend(email,EmailText,EmailSubject);
    await UserModel.updateOne({email:email},{$set:{otp:Code}},{upsert:true})
    return {status:"success",message:"Your 6 Digit OTP is Send"}
}
catch (e){
    return {status:"Faild",message:"Somthing Is Wrong"}
}

}
const VarifyOTPService = async (req)=>{

    try{
        let email = req.params.email;
        let otp = req.params.otp;
        let total = await UserModel.find({email:email,otp:otp}).count('total');

        if(total === 1){
            //read id 
            let user_id = await UserModel.find({email:email,otp:otp}).select('_id');
            //Token Generate 
            let token = EncodeTocken(email,user_id[0]['_id'].toString())
            //set otp 0
            await UserModel.updateOne({email:email},{$set:{otp:'0'}})
       
        return {status:"success",message:"Valid OTP",token:token}

    }
    else{
        return {status:"Faild",message:"Invalide OTP"}
    }
        
    }
    catch(e){
        return {status:"Faild",message:"Invalide OTP"}
    }
    
}
//update and create
const SaveProfileService = async (req)=>{
   try{
    let user_id = req.headers.user_id;
    let reqbody = req.body;
    reqbody.userID = user_id;
    await ProfileModel.updateOne({userID:user_id},{$set:reqbody},{upsert:true})
    return {status:"success",message:"Profile save success"}
   }

    catch (e) {
        return {status:"fail", message:e.toString()}
    }

}
//Read
const ReadProfileService = async (req)=>{
    let user_id = req.headers.user_id;
  let result =   await ProfileModel.find({userID:user_id})
  return {status:"success",data:result}
}

module.exports={
    UserOTPService,
    VarifyOTPService,
    SaveProfileService,
    ReadProfileService
}