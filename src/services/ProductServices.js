const BrandModel = require("../Models/BrandModel")
const CategoryModel = require("../Models/CategoryModel");
const ProductModel = require("../Models/ProductModel");
const multer = require('multer')
// const ProductSliderModel = require("../Models/ProductSliderModel")
const mongoose = require('mongoose');

const ProductDetailsModel = require("../Models/ProductDetailModel");
const ObjectId = mongoose.Types.ObjectId;
const path = require('path');

const fs = require('fs')



const ProductCreateService = async (req) => {

    // console.log(req.files)


    try {
        let product = await ProductModel.create(req.body)

        const productID = product["_id"].toString()

        // if (req.files.length <= 3) {

        let dataObject = {}
        req.files.map((item, i) => {

            dataObject[`img${parseFloat(i) + 1}`] = item.destination + "/" + item.filename

        })
        dataObject.productID = productID
        await ProductDetailsModel.create(dataObject)
        //console.log(dataObject)
        // }



        // await ProductDetailsModel.create({ productID })
        // await ProductDetailsModel.create({ productID,img1:'fdfdafa.com })

        return { status: "success", message: 'created successfully.' }
    } catch (err) {
        return { status: "fail", data: err.toString() }

    }
}











const ProductUpdateService = async (req) => {


    try {
        const productID = req.params.id
    

        await ProductModel.updateOne({ _id: productID }, { $set: { ...req.body } })
        
        return { status: "success", message: 'Updated successfully.' }
    } catch (err) {
        return { status: "fail", data: err.toString() }

    }
}

const ProductDeleteService = async (req) => {



    try {

        const productID = req.params.id

        const deletedProduct = await ProductDetailsModel.findOne({ productID })


        if (deletedProduct.img1) {
            fs.unlinkSync(`${deletedProduct.img1}`)
        }
        if (deletedProduct.img2) {
            fs.unlinkSync(`${deletedProduct.img2}`)
        }

        if (deletedProduct.img3) {
            fs.unlinkSync(`${deletedProduct.img3}`)
        }
        if (deletedProduct.img4) {
            fs.unlinkSync(`${deletedProduct.img4}`)
        }
        if (deletedProduct.img5) {
            fs.unlinkSync(`${deletedProduct.img5}`)
        }



        await ProductDetailsModel.deleteOne({ productID: productID })


        await ProductModel.deleteOne({ _id: productID })


        // const imgSource = ['img1', 'img2', 'img3', 'img4', 'img5']
        // imgSource.map((item, i) => {
        //    const res= fs.unlinkSync(`${deletedProduct[item]}`,)



        // })

        return { status: "success", message: 'Deleted successfully.' }
    } catch (err) {
        return { status: "fail", data: err.toString() }

    }
}





const AllProductsListService = async () => {
    try {
        let data = await ProductModel.find({ approved: true })
        return { status: "success", data }
    } catch (err) {
        return { status: "fail", data: err.toString() }

    }
}

















const BrandListService = async () => {
    try {
        let data = await BrandModel.find()
        return { status: "success", data }
    } catch (err) {
        return { status: "fail", data: err.toString() }

    }
}
const CategoryListService = async () => {
    try {
        let data = await CategoryModel.find()
        return { status: "success", data: data }
    } catch (err) {
        return { status: "fail", data: err }.toString()

    }
}

const SliderListService = async () => {
    try {
        //  let data = await ProductSliderModel.find()
        return { status: "success", data: 'data' }
    } catch (err) {
        return { status: "fail", data: err.toString() }


    }
}





const ListByBrandService = async (req) => {
    try {
        let BrandID = new ObjectId(req.params.BrandID)

        let matchStage = { $match: { brandID: BrandID, approved: true } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }
}
const ListByCategoryService = async (req) => {
    try {
        let CategoryID = new ObjectId(req.params.CategoryID)

        let matchStage = { $match: { categoryID: CategoryID, approved: true } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }
}
const ListByRemarkService = async (req) => {
    try {
        let Remark = req.params.Remark

        let matchStage = { $match: { remark: Remark, approved: true } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }
}











const ListBySmilierService = async (req) => {

    try {
        let CategoryID = new ObjectId(req.params.CategoryID)

        let matchStage = { $match: { categoryID: CategoryID } }
        let limitStage = { $limit: 20 }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            limitStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }


}
const ListByKeywordService = async (req) => {

    try {
        let SearchRegex = { "$regex": req.params.Keyword, "$options": "i" }

        let SearchParams = [{ title: SearchRegex }, { shortDes: SearchRegex }]

        let SearchQuery = { $or: SearchParams }

        let matchStage = { $match: SearchQuery, approved: true }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }
}





const DetailsService = async (req) => {
    try {
        let ProductID = new ObjectId(req.params.ProductID)
        let matchStage = { $match: { _id: ProductID, approved: true } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let details = { $lookup: { from: 'productdetails', localField: '_id', foreignField: 'productID', as: 'details' } }
        let unwindDetails = { $unwind: "$details" }

        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
                "approved": 0

            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage,
            details,
            unwindDetails
        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }


}

const ReviewListService = async (req) => {


    try {
        let ProductID = new ObjectId(req.params.ProductID)
        let matchStage = { $match: { productID: ProductID } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }

        let joinProfilesStage = { $lookup: { from: 'profiles', localField: 'userID', foreignField: 'userID', as: 'profile' } }

        let unwindProfile = { $unwind: '$profile' }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let details = { $lookup: { from: 'productdetails', localField: '_id', foreignField: 'productID', as: 'details' } }
        let unwindDetails = { $unwind: "$details" }

        let projectionStage = {
            $project: {
                "des": 1,
                "rating": 1,
                "profile.cus_name": 1,
                "updatedAt": 1,
                "createdAt": 1
            }
        }
        let data = await ReviewModel.aggregate([
            matchStage,
            joinProfilesStage,
            unwindProfile,
            projectionStage
            // joinWithBrandStage,
            // joinWithCategoryStage,
            // unwindBrandStage,
            // unwindCategoryStage,
            // projectionStage,
            // details,
            // unwindDetails
        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }




}


const ProductListByFilterService = async (req) => {
    try {



        let matchConditions = {}

        if (req.body['categoryID']) {
            matchConditions.categoryID = new ObjectId(req.body['categoryID'])
        }

        if (req.body['brandID']) {
            matchConditions.brandID = new ObjectId(req.body['brandID'])
        }

        let MatchStage = { $match: matchConditions }

        const AddFieldsStage = { $addFields: { numericPrice: { $toInt: "$price" } } }

        let priceMin = parseInt(req.body['priceMin'])
        let priceMax = parseInt(req.body['priceMax'])


        const PriceMatchConditions = {}

        if (!isNaN(priceMin)) {
            PriceMatchConditions['numericPrice'] = { $gte: priceMin }
        }

        if (!isNaN(priceMax)) {
            PriceMatchConditions['numericPrice'] = { ...(PriceMatchConditions['numericPrice'] || {}), $lte: priceMax }
        }
        const PriceMatchStage = { $match: PriceMatchConditions }

        let JoinWithBrandStage = { $lookup: { from: "brands", localField: "brandID", foreignField: "_id", as: "brand" } }
        let JoinWithCategoryStage = { $lookup: { from: "categories", localField: "categoryID", foreignField: "_id", as: "category" } }

        let UnwindCategoryStage = { $unwind: '$category' }
        let UnwindBrandStage = { $unwind: '$brand' }

        let ProjectionStage = { $project: { "brand._id": 0, "category._id": 0, "categoryID": 0, "brandID": 0 } }



        const data = await ProductModel.aggregate([
            MatchStage,
            AddFieldsStage,
            PriceMatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            UnwindCategoryStage,
            UnwindBrandStage,
            ProjectionStage
        ])



        return {
            'status': 'success', data
        }
    } catch (error) {
        return { status: 'fail', message: 'something went wrong.' }
    }

}

























module.exports = {

    ProductDeleteService,

    ProductUpdateService,
    ProductCreateService,
    AllProductsListService,
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySmilierService,
    ListByKeywordService,
    ListByRemarkService,
    DetailsService,
    ReviewListService,
    ProductListByFilterService
}










































