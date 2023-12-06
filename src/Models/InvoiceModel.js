const mongoose = require('mongoose');

const DataScema = mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,require:true},
    payable:{type:String,require:true},
    cus_details:{type:String,require:true},
    ship_details:{type:String,require:true},
    tran_id:{type:String,require:true},
    val_id:{type:String,require:true},
    delivery_status:{type:String,require:true},
    payment_status:{type:String,require:true},
    total:{type:String,require:true},
    vat:{type:String,require:true}
},{
    timestamps:true,versionKey:false
})

const InvoiceModel = mongoose.model('invoices',DataScema);
module.exports = InvoiceModel;