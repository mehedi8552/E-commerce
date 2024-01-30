

const {
    FeatureListService,
    LegalsService
} = require('../Servies/FeaturesServices');

exports.FeatureListController = async (req,res)=>{
    let result = await FeatureListService(req);
    return res.status(200).json(result);
}

exports.LegalsController = async (req,res)=>{
    let result = await LegalsService(req);
    return res.status(200).json(result);
}