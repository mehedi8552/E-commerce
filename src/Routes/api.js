const express = require('express');
const ProductController = require ('../Controllers/ProductController.js');
const UserController = require('../Controllers/UserController.js');

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










module.exports = router;