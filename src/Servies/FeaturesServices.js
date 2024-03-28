const FeatureModel = require("../Models/FeaturesModel");
const LegalModel = require("../Models/LegalModel");



const FeatureListService = async (req)=>{
    try{
        let data = await FeatureModel.find();
        return {status:"success",data:data}
    }
    catch(e){
        return {status:"Failed",data:e.toString()}
    }
}

const LegalsService = async (req)=>{
    try{
        let type=req.params.type
        let data = await LegalModel.find({type:type});
        return {status:"success",data:data}
    }
    catch(e){
        return {status:"Failed",data:e.toString()}
    }
}


module.exports ={
    FeatureListService,
    LegalsService
}