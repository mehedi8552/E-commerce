const { 
    SaveWishlistService,
    RemoveWishlistService,
    WishListService
    } = require("../Servies/WishListServices")

exports.Wishlist= async (req,res)=>{
    let result = await WishListService(req);
    res.status(200).json(result);
}
exports.SaveWishlist= async (req,res)=>{
    let result = await SaveWishlistService(req);
     res.status(200).json(result);
}
exports.RemoveWishlist= async (req,res)=>{
    let result = await RemoveWishlistService(req);
     res.status(200).json(result);
}
