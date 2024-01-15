const FeatureModel = require("../Models/FeaturesModel");



const FeatureListService = async (req)=>{
    try{
        let data = await FeatureModel.find();
        return {status:"Success",data:data}
    }
    catch(e){
        return {status:"Failed",data:e.toString()}
    }
}


module.exports ={
    FeatureListService
}