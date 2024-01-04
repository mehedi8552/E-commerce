const CategoryModel = require("../models/CategoryModel");
const BrandModel = require("../models/BrandModel");
const ProductModel = require("../models/ProductModel");
const mongoose = require("mongoose");

const ProductSliderModel = require("../models/ProductSliderModel");
const ProductDetailModel = require("../models/Productdetails");
const ReviewModel = require("../models/ReviewModel");
const FeaturesModel = require("../models/FeaturesModel");


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
     "_id":0
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
    BrandListService
}


