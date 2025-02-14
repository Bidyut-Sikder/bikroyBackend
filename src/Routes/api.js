const express = require('express')
const { ProductBrandList, ProductCategoryList, ProductListByBrand, ProductListByCategory, ProductListByKeyword, ProductDetails, ProductCreate, AllProductsList, ProductDelete, ProductUpdate, ProductListByTag, ProductListBySort } = require('../Controllers/ProductController')
const { SignUp, UserLogout, UpdateProfile, ReadProfile, UserLogin, UserProducts, UserCreateProductsCheck, UserSingleProductDetail } = require('../Controllers/UserController')
const { AuthVerification } = require('../Middleware/AuthVerification')
const multer = require('multer')
const { MultipleFileUploader } = require('../Middleware/MultipleFileUploader')

const { AdminLogin, ReadAdmin, UpdateAdmin, AdminProduct, AdminProductUpdate, AdminLogout } = require('../Controllers/AdminControllers')

const { SingleFileUploader } = require('../Middleware/SingleFileUploader')

const router = express.Router()



//Product Apis  



router.get('/AllProducts', AllProductsList)
// 

router.get('/ProductBrandList', ProductBrandList)
router.get('/ProductCategoryList', ProductCategoryList)

router.get('/ProductListByBrand/:BrandID', ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID', ProductListByCategory)

router.get('/ProductListByKeyword/:Keyword', ProductListByKeyword)
router.get('/ProductDetails/:ProductID', ProductDetails)



//product sorting
router.get('/ProductListsBySort/:sortingKeyword', ProductListBySort)




//https://shopserver-eo0x.onrender.com





//User Apis 
router.post('/SignUp', SignUp)
router.post('/ProductCreate', AuthVerification, MultipleFileUploader('file', 5), ProductCreate)

router.get('/ProductDelete/:id', AuthVerification, ProductDelete)

router.get('/UserSingleProductDetail/:id', AuthVerification, UserSingleProductDetail)


router.get('/UserLogin/:email/:password', UserLogin)
router.get('/UserLogout/', AuthVerification, UserLogout)


router.post('/UpdateUserProfile/', AuthVerification, SingleFileUploader('file'), UpdateProfile)
router.get('/ReadUserProfile/', AuthVerification, ReadProfile)
router.get('/UserProducts/', AuthVerification, UserProducts)


router.post('/UserProductUpdate/:id', AuthVerification, MultipleFileUploader('file', 5), ProductUpdate)

//UserSingleProductDetail

//Admin apis


router.get('/AdminLogin/:email/:password', AdminLogin)
router.get('/ReadAdmin/', AuthVerification, ReadAdmin)
router.post('/UpdateAdmin/', AuthVerification, SingleFileUploader('file'), UpdateAdmin)
router.get('/AdminProduct/', AuthVerification, AdminProduct)
router.post('/AdminProductUpdate/:id', AuthVerification, AdminProductUpdate)

router.get('/AdminLogout/', AuthVerification, AdminLogout)

 
// search by tag
router.get('/ProductListByTag/:district/:subdistrict/:categoryID', ProductListByTag)







module.exports = router;







































