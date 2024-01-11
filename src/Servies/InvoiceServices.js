const mongoose = require('mongoose');

const ProfileModel = require('../Models/ProfileModel');
const CartModel = require("../models/CardModel");
const InvoiceModel = require("../models/InvoiceModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentSettingModel = require("../models/PaymentSettingModel");

const ObjectID = mongoose.Types.ObjectId;
const FormData = require('form-data');
const axios = require('axios');


const CreateInvoiceService = async (req)=>{
try{
    // =============Step 01: Calculate Total Payable & Vat=====================================================================================
        let user_id = new ObjectID(req.headers.user_id);
        let email =  req.headers.email;

        matchStage={$match:{userID:user_id}};

        joinWithProduct = {$lookup:{from:'products',localField:'productID',foreignField:'_id', as:'product'}}
        unwindStage = {$unwind:"$product"};

        let CartProducts=await CartModel.aggregate([matchStage,joinWithProduct,unwindStage])

       // console.log(CartProducts)
        let total_amount =0;
        CartProducts.forEach((element)=>{
            let Price;
                if(element['product']['discount']== true){
                     Price = element['product']['discountPrice']
                }
                else{
                     Price = element['product']['price']
                }
               total_amount += parseFloat(element['qty']*Price) ;
        }
         
        )

        let vat = total_amount*0.05;
        let Payable = total_amount+vat


        //Customer details and shiping details............
        let profile = await ProfileModel.aggregate([matchStage])
        let userDetails =`Name:${profile[0]['cus_name']},Phone:${profile[0]['cus_phone']},Email:${email}`;
        let ShipDetails =`Name:${profile[0]['ship_name']},Phone:${profile[0]['ship_phone']},Address:${profile[0]['ship_add']}`
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

        let invoiceID = createInvoice['id'];

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
            await CartModel.deleteMany({userID:user_id});

        return {status:'success',message:invoiceID}
    
}
catch(e){
    return {status:'Failed',message:e.toString()}
}
}

const PaymentFailService = async (req)=>{
    try{
        
    }
    catch(e){
    
    }
    }


const PaymentCancelService = async (req)=>{
        try{
            
        }
        catch(e){
        
        }
        }



 const PaymentIPNService = async (req)=>{
    try{
                
            }
    catch(e){
            
            }
    }

const PaymentSuccessService = async (req)=>{
    try{
                    
                }
    catch(e){
                
        }
 }

 const InvoiceListService = async (req)=>{
    try{
                    
                }
    catch(e){
                
        }
 }

 const InvoiceProductService = async (req)=>{
    try{
                    
                }
    catch(e){
                
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