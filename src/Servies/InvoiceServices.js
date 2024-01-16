const mongoose = require('mongoose');

const ProfileModel = require('../Models/ProfileModel');
const CartModel = require("../models/CardModel");
const InvoiceModel = require("../models/InvoiceModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentSettingModel = require("../models/PaymentSettingModel");

const ObjectID = mongoose.Types.ObjectId;
const FormData = require('form-data');
const axios = require('axios');
const invoiceproductsModel = require('../models/InvoiceProductModel');


const CreateInvoiceService = async (req)=>{
try{
    //Step 01: Calculate Total Payable & Vat......
        let user_id = new ObjectID(req.headers.user_id);
        let cus_email =  req.headers.email;

        matchStage={$match:{userID:user_id}};
        joinWithProduct = {$lookup:{from:'products',localField:'productID',foreignField:'_id', as:'product'}}
        unwindStage = {$unwind:"$product"};
        let CartProducts = await CartModel.aggregate([matchStage,joinWithProduct,unwindStage])
        let productIDs = CartProducts.map(product => product.productID);
       // console.log(CartProducts)
        let total_amount =0;
        CartProducts.forEach((element)=>{
            let price;
                if(element['product']['discount']){
                    price=parseFloat(element['product']['discountPrice'])
                }
                else{
                    price=parseFloat(element['product']['price'])
                }
               total_amount += parseFloat(element['qty']*price) ;
        }
         
        )

        let vat = total_amount*0.05;
        let Payable = total_amount+vat


        //Customer details and shiping details............
        let Profile = await ProfileModel.aggregate([matchStage])
        let userDetails =`Name:${Profile[0]['cus_name']},Phone:${Profile[0]['cus_phone']}`;
        let ShipDetails =`Name:${Profile[0]['ship_name']},Phone:${Profile[0]['ship_phone']},Address:${Profile[0]['ship_add']}`
        //console.log(userDetails);

        //Transection and other ID.....

        let tran_id = Math.floor(10000000+Math.random()*90000000);
        let val_id = 0;
        let delivery_status = 'pending';
        let payment_status = 'pending';

        // Create invoice................

        let createInvoice = await InvoiceModel.create({

            userID:user_id,
            payable:Payable,
            cus_details:userDetails,
            ship_details:ShipDetails,
            tran_id:tran_id,
            val_id:val_id,
            delivery_status:delivery_status,
            payment_status:payment_status,
            total:total_amount,
            vat:vat
        })

        //Create invoice Product 

        let invoiceID = createInvoice['_id'];

       CartProducts.forEach(async(element)=>{
           await InvoiceProductModel.create({
                userID:user_id,
                invoiceID:invoiceID,
                productID:element['productID'],
                qty:element['product']['discount']?element['product']['discountPrice']:element['product']['price'],
                price:element['price'],
                color:element['color'],
                size:element['size']
            });

        });
            // Remove cart list
            await CartModel.deleteMany({ productID: { $in: productIDs } });


            //Create SSL payment;

            let  PaymentSetting= await PaymentSettingModel.find();

            const form = new FormData();

            //SSL data section 
            form.append('store_id', PaymentSetting[0]['store_id']);
            form.append('store_passwd', PaymentSetting[0]['store_passwd']);
            form.append('total_amount', Payable.toString());
            form.append('currency', PaymentSetting[0]['currency']);
            form.append('tran_id', tran_id);
            form.append('success_url', `${PaymentSetting[0]['success_url']}/${tran_id}`);
            form.append('fail_url', `${PaymentSetting[0]['fail_url']}/${tran_id}`);
            form.append('cancel_url', `${PaymentSetting[0]['cancel_url']}/${tran_id}`);
            form.append('ipn_url', `${PaymentSetting[0]['ipn_url']}/${tran_id}`);
    
            form.append('cus_name', Profile[0].cus_name);
            form.append('cus_email',cus_email);
            form.append('cus_add1', Profile[0].cus_add);
            form.append('cus_add2', Profile[0].cus_add);
            form.append('cus_city', Profile[0].cus_city);
            form.append('cus_state', Profile[0].cus_state);
            form.append('cus_postcode', Profile[0].cus_postcode);
            form.append('cus_country', Profile[0].cus_country);
            form.append('cus_phone', Profile[0].cus_phone);
            form.append('cus_fax', Profile[0].cus_phone);
    
            form.append('shipping_method', 'YES');
            form.append('ship_name', Profile[0].ship_name);
            form.append('ship_add1', Profile[0].ship_add);
            form.append('ship_add2', Profile[0].ship_add);
            form.append('ship_city', Profile[0].ship_city);
            form.append('ship_state', Profile[0].ship_state);
            form.append('ship_country', Profile[0].ship_country);
            form.append('ship_postcode', Profile[0].ship_postcode);
            form.append('product_name', 'product_name');
            form.append('product_category', 'category');
            form.append('product_profile', 'profile');
            form.append('product_amount', '3');

            let reqssl = await axios.post(PaymentSetting[0]["init_url"],form)

            //console.log(reqssl)

        return {status:'success',message:reqssl.data}
    
}
catch(e){
    return {status:'Failed',message:e.toString()}
}
}

const PaymentFailService = async (req)=>{
    try{

        trxID = req.params.trxID;
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"Fail"});
        return {status:"PaymentFail"}
        
    }
    catch(e){
        return {status:"fail", message:e.toString()}
    }
    }

const PaymentCancelService = async (req)=>{
        try{
            trxID = req.params.trxID;
            await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"Cancel"});
            return {status:"Payment Cancel"}
            
        }
        catch(e){
            return {status:"fail", message:e.toString()}
        }
        }

 const PaymentIPNService = async (req)=>{
    try{
        trxID = req.params.trxID;
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"IPN"});
        return {status:"Payment IPN"}
        
    }
    catch(e){
        return {status:"fail", message:e.toString()}
    }
    }

const PaymentSuccessService = async (req)=>{
    try{
        trxID = req.params.trxID;
        await InvoiceModel.updateOne({tran_id:trxID},{payment_status:"success"});

        return{status:"Payment Success"}

        
    }
    catch(e){
        return {status:"fail", message:e.toString()}
    }
 }
//done
 const InvoiceListService = async (req)=>{
    try{

        let user_id = req.headers.user_id;

        let invoice = await InvoiceModel.find({userID:user_id})

        return {status:'success',message:invoice}
    
    }
    catch(e){
        return {status:'Failed',message:e.toString()}
    }
}
//done
 const InvoiceProductService = async (req)=>{
    try{
      let user_id = new ObjectID(req.headers.user_id);
      let invoice_id = new ObjectID(req.params.invoice_id);

      let matchStage = {$match:{userID:user_id,invoiceID:invoice_id}};
      let joinWithProduct = {$lookup:{from:"products",localField:"productID",foreignField:"_id" ,as:"product"}}
      let unwindStage = {$unwind:"$product"}
           
      let invoproductlist = await invoiceproductsModel.aggregate([
        matchStage,
        joinWithProduct,
        unwindStage
      ])
       
      return {status:"success",data:invoproductlist}
                    
    }
    catch(e){
        return {status:'Failed',message:e.toString()}           
    }
 }


module.exports= {
    CreateInvoiceService,
    PaymentFailService,
    InvoiceProductService,
    InvoiceListService,
    PaymentSuccessService,
    PaymentIPNService,
    PaymentCancelService,
}