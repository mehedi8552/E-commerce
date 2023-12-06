const mongoose = require("mongoose");

DataScema = mongoose.Schema({
    title:{type:String,require:true},
    image:{type:String,require:true},
    des:{type:String,require:true},
    price:{type:String,require:true},
    productID:{type:mongoose.Schema.Types.ObjectId,require:true}
},
{
    timestamps:true,versionKey:false
})

const ProductSliderModel = mongoose.model('productsliders',DataScema);

module.exports = ProductSliderModel;