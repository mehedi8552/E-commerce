const {
    UserOTPService,
    VarifyOTPService,
    UserLogOutService,
    CreateProfileService,
    UpdateProfileService,
    ReadProfileService

}= require('../Servies/UserServices')


exports.UserOTP = async (req,res)=>{
    let result = await UserOTPService(req);
   res.status(200).json(result);
}
exports.VarifyOTP = async (req,res)=>{
    
}
exports.UserLogOut = async (req,res)=>{
    
}
exports.CreateProfile = async (req,res)=>{
    
}
exports.UpdateProfile = async (req,res)=>{
    
}
exports.ReadProfile = async (req,res)=>{
    
}