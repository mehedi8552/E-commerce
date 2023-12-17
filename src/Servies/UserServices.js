const EmailSend = require("../Utility/EmailHelper");
const UserModel = require('../Models/UserModel');


const UserOTPService = async (req)=>{

try{
    let email = req.params.email;
    let Code = Math.floor(100000+Math.random()*900000);
    let EmailText = `Your Verification Code is:${Code}`;
    let EmailSubject = "Email Verification."
    await  EmailSend(email,EmailText,EmailSubject);
  
    await UserModel.updateOne({email:email},{$set:{otp:Code}},{upsert:true})
    return {status:"success",message:"Your 6 Digit OTP is Send"}
}catch (e){
    return {status:"Faild",message:"Somthing Is Wrong"}
}

}
const VarifyOTPService = async (req)=>{
    
}
const UserLogOutService = async (req)=>{
    
}
const CreateProfileService = async (req)=>{
    
}
const UpdateProfileService = async (req)=>{
    
}
const ReadProfileService = async (req)=>{
    
}

module.exports={
    UserOTPService,
    VarifyOTPService,
    UserLogOutService,
    CreateProfileService,
    UpdateProfileService,
    ReadProfileService
}