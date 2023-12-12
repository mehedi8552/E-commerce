const mongoose = require('mongoose');

const DataScema = mongoose.Schema({
    brandName:{type:String,unique:true,require:true},
    brandImg:{type:String,require:true}

},
{
    timestamps:true,versionKey:false
})


const BarandModel = mongoose.model('brands',DataScema)

module.exports = BarandModel;
