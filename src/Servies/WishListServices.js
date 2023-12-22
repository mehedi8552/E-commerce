
const WishModel = require('../Models/WishModel');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const WishListService = async (req)=>{
    try{

        let user_id=new ObjectId(req.headers.user_id);
        //console.log(req.headers);

        let matchStage= {$match: {userID:user_id}}
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

        let data= await WishModel.aggregate([
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
const SaveWishlistService = async (req)=>{

    try{
        let user_id = req.headers.user_id;
        console.log(user_id)
        let reqbody = req.body;
        reqbody.userID = user_id;

         await WishModel.updateOne(reqbody,{$set:reqbody},{upsert:true});

        return {status:"success",message:"WishList Add success."}
    }
    catch (e){
        return {status:"Faild",message:e.toString()}
    }
}


const RemoveWishlistService = async (req)=>{

    try{
        let user_id = req.headers.user_id;
        let reqbody = req.body;
        reqbody.userID = user_id;

         await WishModel.deleteOne(reqbody,{$set:reqbody},{upsert:true});

        return {status:"success",message:"WishList Remove success."}
    }
    catch (e){
        return {status:"Faild",message:e.toString()}
    }
}

module.exports = {
    SaveWishlistService,
    RemoveWishlistService,
    WishListService
}