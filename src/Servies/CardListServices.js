

const mongoose = require("mongoose");
const ProductModel = require("../models/ProductModel");
const CartModel = require("../models/CardModel");
const ObjectId = mongoose.Types.ObjectId;










const SaveCartListService = async (req)=>{
    try{
        let user_id=req.headers._id;
        let reqBody=req.body;
        reqBody.userID = user_id;

        await CartModel.create(reqBody)
        return {status:"success", message:"Cart List Created"}
    }
    catch (e) {
        return {status:"fail", message:e.toString()}
    }
 
 }

 const RemoveCartListService = async (req)=>{
    try{
        let user_id=req.headers._id;
        let reqBody=req.body;
        reqBody.userID = user_id;
       let data = await  CartModel.deleteOne(reqBody);
        return {status:"success", message:data}
    }
    catch (e) {
        return {status:"fail",message:e.toString()}
    }
 
 }

 const CartListService = async (req)=>{
    try{

        let user_id=new ObjectId(req.headers.user_id);
        //console.log(req.headers);
      

        let matchStage= {$match: {userID:user_id}}
        //console.log(userID);
        let JoinStageProduct={$lookup: {from: "products", localField: "productID", foreignField: "_id", as: "product"}};
        let unwindProductStage={$unwind: "$product"}

        let JoinStageBrand={$lookup: {from: "brands", localField: "product.brandID", foreignField: "_id", as: "brand"}};
        let unwindBrandStage={$unwind: "$brand"}

        let JoinStageCategory={$lookup: {from: "categories", localField: "product.categoryID", foreignField: "_id", as: "category"}};
        let unwindCategoryStage={$unwind: "$category"}

        let projectionStage= {$project: {'_id': 0,
                'userID': 0, 'createdAt':0,
                'updatedAt':0,'product._id':0,
                'product.categoryID':0,'product.brandID':0,
                'brand._id':0,'category._id':0,
        }}

        // let projectionStage = {$project:{
        //     'color':1,
        //     'qty':1,
        //     'size':1
        // }}

        let data= await CartModel.aggregate([
            matchStage,
            JoinStageProduct,
            unwindProductStage,
            JoinStageBrand,
            unwindBrandStage,
            JoinStageCategory,
            unwindCategoryStage,
            projectionStage
        ])

        return {status:"success", data:data}
    }
 
     catch (e) {
         return {status:"fail", message:e.toString()}
     }
 
 }


 let UpdateCartListService = async (req)=>{

  try{

    let user_id = req.headers.user_id;
    let CartdID = req.params.CartdID;

   // console.log(CartdID)
    let redbody = req.body;

   let data = await CartModel.updateOne({_id:CartdID,userID:user_id},{$set:redbody});
    return {status:"success", data:data}
  }
  catch(e){
    return {status:"fail", message:e.toString()}
  }
 }


 module.exports ={
    SaveCartListService,
    UpdateCartListService,
    RemoveCartListService,
    CartListService

 }