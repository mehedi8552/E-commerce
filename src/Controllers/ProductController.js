
const {
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService, 
    ListBySimilerService,
    ListByKeywordService,
    ListByRemarkService,
    ReviewListService,
    DetailsService,
    BrandListService
} = require('../Servies/ProductServices');

exports.ProducBrandList = async (req,res)=>{
 let result = await BrandListService();
 return res.status(200).json(result);
}

exports.ProducCategoryList = async (req,res)=>{
    let result = await CategoryListService();
    return res.status(200).json(result);
}

exports.ProducSliderList = async (req,res)=>{
    let result = await SliderListService();
    return res.status(200).json(result);
}







exports.ProducListByBrand = async (req,res)=>{
    let result = await ListByBrandService(req);
    return res.status(200).json(result);
}
exports.ProducListByCategory = async (req,res)=>{
    let result = await ListByCategoryService(req);
    return res.status(200).json(result);
}
exports.ProductListByRemark = async (req,res)=>{
    let result = await ListByRemarkService(req);
    return res.status(200).json(result);  
}








exports.ProducListBySimiler = async (req,res)=>{
    let result = await ListBySimilerService(req);
    return res.status(200).json(result);
}

exports.ProducListByKeyword = async (req,res)=>{
    let result = await ListByKeywordService(req);
    return res.status(200).json(result);
}

exports.ProductReviewList = async (req,res)=>{
    let result = await ReviewListService(req);
    return res.status(200).json(result);
}

exports.ProductDetails = async (req,res)=>{
    let result = await DetailsService(req);
    return res.status(200).json(result);
}


exports.CreateProductReview = async (req,res)=>{
    
}