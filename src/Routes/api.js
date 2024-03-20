const express = require('express')
const { ProductBrandList, ProductCategoryList, ProductListByBrand, ProductListByCategory, ProductListByKeyword, ProductListByRemark, ProductDetails, ProductCreate, AllProductsList, ProductDelete, ProductUpdate } = require('../Controllers/ProductController')
const { SignUp, UserLogout, UpdateProfile, ReadProfile, UserLogin } = require('../Controllers/UserController')
const { AuthVerification } = require('../Middleware/AuthVerification')
const multer = require('multer')
const { MultipleFileUploader } = require('../Middleware/MultipleFileUploader')

const { AdminLogin, ReadAdmin, UpdateAdmin, AdminProduct, AdminProductUpdate } = require('../Controllers/AdminControllers')

const { SingleFileUploader } = require('../Middleware/SingleFileUploader')

const router = express.Router()



//Product Apis  

router.post('/ProductCreate',MultipleFileUploader('file',5), ProductCreate)







  
 
 
  
 

////////////////

router.get('/AllProducts', AllProductsList)
router.get('/ProductDelete/:id', ProductDelete)
router.get('/ProductUpdate/:id', ProductUpdate)


router.get('/ProductBrandList', ProductBrandList)
router.get('/ProductCategoryList', ProductCategoryList)

router.get('/ProductListByBrand/:BrandID', ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID', ProductListByCategory)

router.get('/ProductListByKeyword/:Keyword', ProductListByKeyword)
router.get('/ProductListByRemark/:Remark', ProductListByRemark)
router.get('/ProductDetails/:ProductID', ProductDetails)



//User Apis 
router.post('/SignUp', SignUp)


router.get('/UserLogin/:email/:password', UserLogin)
router.get('/UserLogout/', AuthVerification, UserLogout)

router.post('/UpdateUserProfile/', AuthVerification,SingleFileUploader('file'), UpdateProfile)
router.get('/ReadUserProfile/', AuthVerification, ReadProfile)





//Admin apis


router.get('/AdminLogin/:email/:password', AdminLogin)
router.get('/ReadAdmin/', AuthVerification,ReadAdmin)
router.post('/UpdateAdmin/',AuthVerification,SingleFileUploader('file'), UpdateAdmin)
router.get('/AdminProduct/',AuthVerification, AdminProduct)
router.get('/AdminProductUpdate/:id',AuthVerification, AdminProductUpdate)












module.exports = router;






















































