const express = require('express');
const ProductController = require ('../Controllers/ProductController.js');
const UserController = require('../Controllers/UserController.js');
const AuthVerification = require('../Middlewares/AuthVerification.js');
const WishListController = require('../Controllers/WishListController');
const CardController = require('../Controllers/CardListController.js');
const InvoiceController = require('../Controllers/InvoiceController.js')

const router = express.Router();

//Product 

router.get('/ProducBrandList',ProductController.ProducBrandList)
router.get('/ProducCategoryList',ProductController.ProducCategoryList)
router.get('/ProducSliderList',ProductController.ProducSliderList)

router.get('/ProducListByBrand/:brandID',ProductController.ProducListByBrand)
router.get('/ProducListByCategory/:categoryID',ProductController.ProducListByCategory)
router.get('/ProductListByRemark/:remark',ProductController.ProductListByRemark)

router.get('/ProducListBySimiler/:categoryID',ProductController.ProducListBySimiler)
router.get('/ProducListByKeyword/:keyword',ProductController.ProducListByKeyword)

router.get('/ProductDetails/:productID',ProductController.ProductDetails)
router.get('/ProductReviewList/:productID',ProductController.ProductReviewList)

//UserController Api section.....

router.get('/UserOTP/:email',UserController.UserOTP);
router.get('/VarifyOTP/:email/:otp',UserController.VarifyOTP);
router.get('/UserLogOut',AuthVerification,UserController.UserLogOut);


router.post('/CreateProfile',AuthVerification,UserController.CreateProfile);
router.post('/UpdateProfile',AuthVerification,UserController.UpdateProfile);
router.post('/ReadProfile',AuthVerification,UserController.ReadProfile);


//Wishlist controller.....
router.post('/Wishlist',AuthVerification,WishListController.Wishlist);
router.post('/RemoveWishlist',AuthVerification,WishListController.RemoveWishlist);
router.post('/SaveWishlist',AuthVerification,WishListController.SaveWishlist);


//Cardlist Controller......
router.post('/SaveCartList',AuthVerification,CardController.SaveCartListContriller)
router.post('/UpdateCartList/:CartdID',AuthVerification,CardController.UpdateCartListContriller)
router.post('/RemoveCartList',AuthVerification,CardController.RemoveCartListContriller)
router.get('/CartList',AuthVerification,CardController.CartListContriller);


//Invoice & Payment
router.get('/CreateInvoice',AuthVerification,InvoiceController.CreateInvoice);
router.get('/InvoiceList',AuthVerification,InvoiceController.InvoiceList);
router.get('/InvoiceProductList/:invoice_id',AuthVerification,InvoiceController.InvoiceProductList);

router.post('/PaymentSuccess/:trxID',InvoiceController.PaymentSuccess);
router.post('/PaymentCancel/:trxID',InvoiceController.PaymentCancel);
router.post('/PaymentFail/:trxID',InvoiceController.PaymentFail);
router.post('/PaymentIPN/:trxID',InvoiceController.PaymentIPN);







module.exports = router;