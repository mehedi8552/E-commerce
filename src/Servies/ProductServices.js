const CategoryModel = require("../models/CategoryModel");
const BrandModel = require("../models/BrandModel");
const ProductModel = require("../Models/ProductModel");
const mongoose = require("mongoose");

const ProductSliderModel = require("../models/ProductSliderModel");
const ReviewModel = require("../models/ReviewModel");


const ObjectId = mongoose.Types.ObjectId;


const BrandListService= async ()=>{
    try{
          let data = await BrandModel.find();
          return {status: "success",data:data}
    }
    catch(err){
      return{status:"failed",data:err}.toString()
    }
  }

const CategoryListService= async ()=>{
  try{
        let data = await CategoryModel.find();
        return {status: "success",data:data}
  }
  catch(err){
    return{status:"failed",data:err}.toString()
  }
}

const SliderListService= async ()=>{
    try{
        let data = await ProductSliderModel.find();
        return {status: "success",data:data}
  }
  catch(err){
    return{status:"failed",data:err}.toString()
  }
}


const ListByBrandService= async (req)=>{
  try{
    let brandID= new ObjectId(req.params.brandID)
    let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
    let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
    let matchStage= {$match: {brandID:brandID}}
    let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
    let unwindCategoryStage={$unwind: "$category"}
    let unwindBrandStage={$unwind: "$brand"}
    let data=await ProductModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])
    return {status:"success", data:data}
}
catch (e) {
    return {status:"fail", data:e.toString()}
} 
}

const ListByCategoryService= async (req)=>{
  try{
    let categoryID=new ObjectId(req.params.categoryID)
    let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
    let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
    let matchStage= {$match: {categoryID:categoryID}}
    let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
    let unwindCategoryStage={$unwind: "$category"}
    let unwindBrandStage={$unwind: "$brand"}
    let data=await ProductModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])
    return {status:"success", data:data}
}
catch (e) {
    return {status:"fail", data:e.toString()}
} 
}
const ListByRemarkService= async (req)=>{
  try{

    
    let remark= req.params.remark
    let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
    let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
    let matchStage= {$match: {remark:remark}}
    let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
    let unwindCategoryStage={$unwind: "$category"}
    let unwindBrandStage={$unwind: "$brand"}
    let data=await ProductModel.aggregate([matchStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])
    return {status:"success", data:data}
}
catch (e) {
    return {status:"fail", data:e.toString()}
} 
}

const ListByFilteServive = async (req)=>{

  try {

    let matchConditions = {};
    if (req.body['categoryID']) {
        matchConditions.categoryID = new ObjectId(req.body['categoryID']);
    }
    if (req.body['brandID']) {
        matchConditions.brandID = new ObjectId(req.body['brandID']);
    }
    let MatchStage = { $match: matchConditions };






    let AddFieldsStage = {
        $addFields: { numericPrice: { $toInt: "$price" }}
    };
    let priceMin = parseInt(req.body['priceMin']);
    let priceMax = parseInt(req.body['priceMax']);
    let PriceMatchConditions = {};
    if (!isNaN(priceMin)) {
        PriceMatchConditions['numericPrice'] = { $gte: priceMin };
    }
    if (!isNaN(priceMax)) {
        PriceMatchConditions['numericPrice'] = { ...(PriceMatchConditions['numericPrice'] || {}), $lte: priceMax };
    }
    let PriceMatchStage = { $match: PriceMatchConditions };






    let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
    let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
    let UnwindBrandStage={$unwind:"$brand"}
    let UnwindCategoryStage={$unwind:"$category"}
    let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

    let data= await  ProductModel.aggregate([
        MatchStage,
        AddFieldsStage,
        PriceMatchStage,
        JoinWithBrandStage,JoinWithCategoryStage,
        UnwindBrandStage,UnwindCategoryStage, ProjectionStage
    ])
    return {status:"success",data:data}

}catch (e) {
    return {status:"fail",data:e}.toString()
}
}



const ListBySimilerService= async (req)=>{
  try{
    let categoryID=new ObjectId(req.params.categoryID)
    let LimitStage = {$limit:10}
    let JoinStage1={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
    let JoinStage2={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
    let matchStage= {$match: {categoryID:categoryID}}
    let projectionStage= {$project: {'category._id': 0, 'brand._id': 0, 'categoryID':0, 'brandID':0}}
    let unwindCategoryStage={$unwind: "$category"}
    let unwindBrandStage={$unwind: "$brand"}
    let data=await ProductModel.aggregate([matchStage,LimitStage, JoinStage1, JoinStage2, unwindCategoryStage, unwindBrandStage, projectionStage,])
    return {status:"success", data:data}
}
catch (e) {
    return {status:"fail", data:e.toString()}
} 
}

const DetailsService= async (req)=>{
  try{
    let ProductID=new ObjectId(req.params.productID)

    let JoinWithcategoryStage={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
    let JoinWithbrandStage={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};
    let JoinWithdetailsStage={$lookup: {from: "productdetails", localField: "_id", foreignField: "productID", as: "details"}};


    let projectionStage= {$project: {'category._id': 0, 'brand._id': 0,'details._id':0,'details.productID':0}}
    let unwindCategoryStage={$unwind: "$category"}
    let unwindBrandStage={$unwind: "$brand"}
    let unwindDetailsStage={$unwind: "$details"}

    let matchStage=  {$match: {_id:ProductID}};

    let data=await ProductModel.aggregate([
        matchStage,
        JoinWithcategoryStage,
        JoinWithbrandStage,
        JoinWithdetailsStage,
        unwindCategoryStage,
        unwindBrandStage,
        unwindDetailsStage,
        projectionStage,
    ])
    return {status:"success", data:data}
}
catch (e) {
    return {status:"fail", data:e.toString()}
}
}

const ListByKeywordService= async (req)=>{
  try{
  let SearchRegex ={"$regex": req.params.keyword, "$options": "i"}
  let SearchParams = [{title:SearchRegex},{shortDes:SearchRegex}];
  let SearchQuery = {$or:SearchParams};


  let MatchStage=  {$match:SearchQuery};

  let JoinWithcategoryStage={$lookup: {from: "categories", localField: "categoryID", foreignField: "_id", as: "category"}};
  let JoinWithbrandStage={$lookup: {from: "brands", localField: "brandID", foreignField: "_id", as: "brand"}};

  let projectionStage= {$project: {'category._id': 0, 'brand._id': 0,'details._id':0,'details.productID':0}}
  let unwindCategoryStage={$unwind: "$category"}
  let unwindBrandStage={$unwind: "$brand"}

  let data= await ProductModel.aggregate([
    MatchStage,
    JoinWithcategoryStage,
    JoinWithbrandStage,
    unwindCategoryStage,
    unwindBrandStage,
    projectionStage,
])
return {status:"success", data:data}
  }
catch (e) {
  return {status:"fail", data:e.toString()}
}
}



const ReviewListService = async (req)=>{
  try{
    let ProductID= new ObjectId(req.params.productID);
    let matchStage=  {$match: {productID:ProductID}};
    let JoinWithProfileStage={$lookup: {from: "profiles", localField: "userID", foreignField: "userID", as: "profile"}};
    let UnwindProfileStage= {$unwind:"$profile"}
   let Projection = {
    $project:{
     "profile.cus_name":1,
     "des":1,
     "profile.cus_phone":1,
     "_id":0,
     "rating":1,
   }
  }

    let data= await ReviewModel.aggregate([
      matchStage,
      JoinWithProfileStage,
      UnwindProfileStage,
      Projection
  ])
  return {status:"success", data:data}
}
  catch (e){
    return {status:"fail", data:e.toString()}
  }
}

const CreateReviewService = async (req)=>{
  try{
    let user_id = req.headers.user_id;
    let reqbody = req.body;

   let data = await ReviewModel.create({
      productID:reqbody['productID'],
      userID:user_id,
      des:reqbody['des'],
      rating:reqbody['rating'],
    })
    return {status:"success", data:data}
  }
  catch(e){
    return {status:"fail", data:e.toString()}
  }
}
module.exports = {
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService, 
    ListBySimilerService,
    ListByKeywordService,
    ListByRemarkService,
    ReviewListService,
    DetailsService,
    BrandListService,
    CreateReviewService,
    ListByFilteServive
}


// File name 'e:/Mern Paid Course/module-17/E-commarce project/src/models/ProductModel.js' differs from already included file name 'e:/Mern Paid Course/module-17/E-commarce project/src/Models/ProductModel.js' only in casing.
//   The file is in the program because:
//     Root file specified for compilation
//     Imported via "../models/ProductModel" from file 'e:/Mern Paid Course/module-17/E-commarce project/src/Servies/ProductServices.js'