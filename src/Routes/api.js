const express = require('express');
const ProductController = require ('../Controllers/ProductController.js')

const router = express.Router();

//Product 

router.get('/ProducBrandList',ProductController.ProducBrandList)
router.get('/ProducCategoryList',ProductController.ProducCategoryList)
router.get('/ProducSliderList',ProductController.ProducSliderList)
router.get('/ProducListByBrand/:BrandID',ProductController.ProducListByBrand)
router.get('/ProducListByCategory/:CategoryID',ProductController.ProducListByCategory)
router.get('/ProducListBySimiler/:Keyword',ProductController.ProducListBySimiler)
router.get('/ProducListByKeyword/:Keyword',ProductController.ProducListByKeyword)
router.get('/ProductListByRemark/:Remark',ProductController.ProductListByRemark)
router.get('/ProductDetails/:ProductID',ProductController.ProductDetails)
router.get('/ProductReviewList/:ProductID',ProductController.ProductReviewList)











module.exports = router;