const mongoose = require('mongoose');

const DataScema = mongoose.Schema({
    store_id:{type:String,require:true},
    store_passwd:{type:String,require:true},
    currency:{type:String,require:true},
    success_url:{type:String,require:true},
    fail_url:{type:String,require:true},
    cancel_url:{type:String,require:true},
    ipn_url:{type:String,require:true},
    init_url:{type:String,require:true}
},{
    timestamps:true,versionKey:false
})

const paymentsettingsModel = mongoose.model('paymentsettings',DataScema);
module.exports = paymentsettingsModel;