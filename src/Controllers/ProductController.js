
const {
    ProductCreateService,
    BrandListService,
    CategoryListService,
  
    ListByBrandService,
    ListByCategoryService,
   
    ListByKeywordService,

    DetailsService,
  
   
    AllProductsListService,
    ProductDeleteService,
    ProductUpdateService,
    ProductListByTagService,
    ProductListBySortService
} = require('../services/ProductServices')











exports.ProductCreate = async (req, res) => {
    let result = await ProductCreateService(req)
    return res.status(200).json(result)

}

exports.ProductDelete = async (req, res) => {
    let result = await ProductDeleteService(req)
    return res.status(200).json(result)

}

exports.ProductUpdate = async (req, res) => {
    let result = await ProductUpdateService(req)
    return res.status(200).json(result)

}


exports.AllProductsList = async (req, res) => {
    let result = await AllProductsListService(req)
    return res.status(200).json(result)

}


exports.ProductBrandList = async (req, res) => {
    let result = await BrandListService()
    return res.status(200).json(result)

}



exports.ProductCategoryList = async (req, res) => {
    let result = await CategoryListService()
    return res.status(200).json(result)
}


exports.ProductListByBrand = async (req, res) => {
    let result = await ListByBrandService(req)
    return res.status(200).json(result)
}
exports.ProductListByCategory = async (req, res) => {
    let result = await ListByCategoryService(req);
    return res.status(200).json(result)
}




exports.ProductDetails = async (req, res) => {
    let result = await DetailsService(req)
    return res.status(200).json(result)
}

exports.ProductListByKeyword = async (req, res) => {
    let result = await ListByKeywordService(req)
    return res.status(200).json(result)
}













exports.ProductListByTag = async (req,res) => {
    let result=await ProductListByTagService(req)
    return res.status(200).json(result)
}




exports.ProductListBySort = async (req,res) => {
    let result=await ProductListBySortService(req)
    return res.status(200).json(result)
}







 




















