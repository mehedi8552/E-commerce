
const {
    SaveCartListService,
    UpdateCartListService,
    RemoveCartListService,
    CartListService
} = require ('../Servies/CardListServices')



exports.SaveCartListContriller = async (req,res)=>{
    let result = await SaveCartListService(req);
    res.status(200).json(result);
}
exports.RemoveCartListContriller = async (req,res)=>{
    let result = await RemoveCartListService(req);
    res.status(200).json(result);
}
exports.CartListContriller = async (req,res)=>{
    let result = await CartListService(req);
    res.status(200).json(result);
}

exports.UpdateCartListContriller = async (req,res)=>{
    let result = await UpdateCartListService(req);
    res.status(200).json(result);
}