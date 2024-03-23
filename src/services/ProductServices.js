const BrandModel = require("../Models/BrandModel")
const CategoryModel = require("../Models/CategoryModel");
const ProductModel = require("../Models/ProductModel");
const multer = require('multer')

const mongoose = require('mongoose');

const ProductDetailsModel = require("../Models/ProductDetailModel");
const ObjectId = mongoose.Types.ObjectId;
const path = require('path');

const fs = require('fs')



const ProductCreateService = async (req) => {

    try {
        const user_id = req.headers.user_id

        const reqBody = req.body;
        reqBody.userID = user_id

        let product = await ProductModel.create(reqBody)

        const productID = product["_id"].toString()

        // if (req.files.length <= 3) {

        let dataObject = {}
        req.files.map((item, i) => {
           // dataObject[`img${parseFloat(i) + 1}`] = item.destination + "/" + item.filename
            
            dataObject[`img${parseFloat(i) + 1}`] =  item.filename

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

        const reqBody = req.body
        if (reqBody.approved) {
            return { status: "success", message: 'Something went wrong.' }
        }



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
            
           // fs.unlinkSync(`${deletedProduct.img1}`)
           
           fs.unlinkSync(`./src/uploads/${deletedProduct.img1}`)
        }
        if (deletedProduct.img2) {
           // fs.unlinkSync(`${deletedProduct.img2}`)
           fs.unlinkSync(`./src/uploads/${deletedProduct.img2}`)

        }

        if (deletedProduct.img3) {
           // fs.unlinkSync(`${deletedProduct.img3}`)
           fs.unlinkSync(`./src/uploads/${deletedProduct.img3}`)

        }
        if (deletedProduct.img4) {
           // fs.unlinkSync(`${deletedProduct.img4}`)
           fs.unlinkSync(`./src/uploads/${deletedProduct.img4}`)

        }
        if (deletedProduct.img5) {
            //fs.unlinkSync(`${deletedProduct.img5}`)
           fs.unlinkSync(`./src/uploads/${deletedProduct.img5}`)

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


    // let user_id = new ObjectId(req.headers.user_id)

    // try {


    //     let matchStage = { $match: { userID: user_id } }
    //     let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
    //     let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
    //     let unwindBrandStage = { $unwind: "$brand" }
    //     let unwindCategoryStage = { $unwind: "$category" }
    //     let details = { $lookup: { from: 'productdetails', localField: '_id', foreignField: 'productID', as: 'details' } }
    //     let unwindDetails = { $unwind: "$details" }

    //     let projectionStage = {
    //         $project: {
    //             'categoryID': 0,
    //             'brandID': 0,
    //             'createdAt': 0,
    //             'updatedAt': 0,
    //             'category.createdAt': 0,
    //             'category.updatedAt': 0,
    //             'brand.createdAt': 0,
    //             'brand.updatedAt': 0,
    //             "approved": 0

    //         }
    //     }
    //     let data = await ProductModel.aggregate([
    //         matchStage,
    //         joinWithBrandStage,
    //         joinWithCategoryStage,
    //         unwindBrandStage,
    //         unwindCategoryStage,
    //         projectionStage,
    //         details,
    //         unwindDetails
    //     ])
    //     return { status: 'success', data: data }
    // } catch (err) {
    //     console.log(err.toString())
    //     return { status: "fail", data: err.toString() }

    // }




}





const ProductListBySortService = async (req) => {
    try {
        const sortingKeyword = req.params.sortingKeyword


        if (sortingKeyword === 'LowToHigh') {
            let matchStage = { $match: { approved: true } }
            let projectionStage = {
                $project: {
                    'numericPrice': 0,

                }
            }
            const data = await ProductModel.aggregate([
                matchStage,
                {
                    $addFields: {
                        numericPrice: { $toDouble: "$price" }
                    }
                },
                {
                    $sort: { numericPrice: 1 }
                },

                projectionStage
            ])


            return { status: "success", data }



        } else if (sortingKeyword === 'HighToLow') {


            let matchStage = { $match: { approved: true } }
            let projectionStage = {
                $project: {
                    'numericPrice': 0,

                }
            }

            const data = await ProductModel.aggregate([
                matchStage,
                {
                    $addFields: {
                        numericPrice: { $toDouble: "$price" }
                    }
                },
                {
                    $sort: { numericPrice: -1 }
                },

                projectionStage
            ])


            return { status: "success", data }


        } else if (sortingKeyword === 'Latest') {

            const data = await ProductModel.find({ approved: true }).sort({ createdAt: 1 })

            return { status: "success", data }

        } else if (sortingKeyword === 'Old') {

            const data = await ProductModel.find({ approved: true }).sort({ createdAt: -1 })

            return { status: "success", data }

        } else {
            return { status: "fail", message: 'something went wrong.' }
        }


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













const ListByKeywordService = async (req) => {

    try {

        let SearchRegex = { "$regex": req.params.Keyword, "$options": "i" }


        let SearchParams = [{ title: SearchRegex }]
        // let SearchParams = [{ title: SearchRegex }, { des: SearchRegex }]

        let SearchQuery = { $or: SearchParams }


        // let matchStage = { $match: SearchQuery, approved: true }
        // let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        // let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        // let unwindBrandStage = { $unwind: "$brand" }
        // let unwindCategoryStage = { $unwind: "$category" }
        // let projectionStage = {
        //     $project: {
        //         'categoryID': 0,
        //         'brandID': 0,
        //         'createdAt': 0,
        //         'updatedAt': 0,
        //         'category.createdAt': 0,
        //         'category.updatedAt': 0,
        //         'brand.createdAt': 0,
        //         'brand.updatedAt': 0,
        //     }
        // }
        // let data = await ProductModel.aggregate([
        //     matchStage,
        //     // joinWithBrandStage,
        //     // joinWithCategoryStage,
        //     // unwindBrandStage,
        //     // unwindCategoryStage,
        //     // projectionStage

        // ])

        const data = await ProductModel.find(SearchQuery)


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

        let Userdetails = { $lookup: { from: 'users', localField: 'userID', foreignField: '_id', as: 'user' } }
        let unwindUserDetails = { $unwind: "$user" }




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
            unwindDetails,
            Userdetails,
            unwindUserDetails
        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }


}





const ProductListByTagService = async (req) => {
    try {

        const district = req.params.district.toLowerCase();
        const subDistrict = req.params.subdistrict.toLowerCase();
        const categoryID = new ObjectId(req.params.categoryID)


        const data = await ProductModel.find({ district: district, subDistrict: subDistrict, categoryID: categoryID })



        return {
            'status': 'success', data
        }
    } catch (error) {
        console.log(error)
        return { status: 'fail', message: 'something went wrong.' }
    }

}






















module.exports = {

    ProductDeleteService,
    ProductListByTagService,
    ProductUpdateService,
    ProductCreateService,
    AllProductsListService,
    BrandListService,
    CategoryListService,
    ProductListBySortService,
    ListByBrandService,
    ListByCategoryService,

    ListByKeywordService,

    DetailsService,


}










































