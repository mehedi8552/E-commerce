const {
    UserOTPService,
    VarifyOTPService,
    SaveProfileService,
    ReadProfileService

}= require('../Servies/UserServices')


exports.UserOTP = async (req,res)=>{
    let result = await UserOTPService(req);
   res.status(200).json(result);
}
exports.VarifyOTP = async (req,res)=>{
    let result = await VarifyOTPService(req);

    if(result['status'] === "success" ){
        //Cookies Option
        let cookieOption = {expires: new Date(Date.now()+24*6060*1000),httpOnly:false}
        // Set Cookies With responce 
        res.cookie('token',result['token'],cookieOption);
        return res.status(200).json(result)
    }else{
        res.status(200).json(result);
    }

   
}
exports.UserLogOut = async (req,res)=>{
    let cookieOption = {expires:new Date(Date.now()-24*6060*1000),httpOnly:false} ;
    res.cookie('token','',cookieOption);
    return res.status(200).json({status:"success"})
}
exports.CreateProfile = async (req,res)=>{
    let result = await SaveProfileService(req);
    res.status(200).json(result);
}
exports.UpdateProfile = async (req,res)=>{
    let result = await SaveProfileService(req);
    res.status(200).json(result);
}
exports.ReadProfile = async (req,res)=>{
    let result = await ReadProfileService(req);
    res.status(200).json(result);
}