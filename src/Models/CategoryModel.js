
const mongoose = require('mongoose');

const DataScema = mongoose.Schema({
    CategoryName:{type:String,unique:true,require:true},
    CategoryImg:{type:String,unique:true}   
},
{
    timestamps:true,versionKey:false
})


const CategoryModel = mongoose.model('Category',DataScema);
module.exports = CategoryModel;