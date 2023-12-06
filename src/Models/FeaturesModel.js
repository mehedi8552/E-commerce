const mongoose = require('mongoose');

const DataScema = mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    img:{type:String,require:true}

},{
    timestamps:true,versionKey:false
})

const featuresModel = mongoose.model('features',DataScema);
module.exports = featuresModel;