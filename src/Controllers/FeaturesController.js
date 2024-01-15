

const {
    FeatureListService
} = require('../Servies/FeaturesServices');

exports.FeatureListController = async (req,res)=>{
    let result = await FeatureListService(req);
    return res.status(200).json(result);
}