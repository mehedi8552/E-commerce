const mongoose = require('mongoose');

const DataScema = mongoose.Schema({
    productID:{type:mongoose.Schema.Types.ObjectId,require:true},
    userID:{type:mongoose.Schema.Types.ObjectId,require:true}
},{
    timestamps:true,versionKey:false
})

const WishModel = mongoose.model('profiles',DataScema);
module.exports = WishModel;