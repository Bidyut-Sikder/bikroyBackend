const { ReadAdminServices, UpdateAdminServices, AdminLoginServies, AdminProductServices, AdminProductSaveServices } = require("../services/AdminServices")



exports.ReadAdmin = async (req, res) => {
    const result = await ReadAdminServices(req)
    res.status(200).json( result )
}


exports.UpdateAdmin = async (req, res) => {
    const result = await UpdateAdminServices(req)
    res.status(200).json( result )
}




exports.AdminLogin = async (req, res) => {
    const result = await AdminLoginServies(req)

   res.status(200).json( result )
}


 

exports.AdminProduct = async (req, res) => {
    const result = await AdminProductServices(req)

   res.status(200).json( result )
}

exports.AdminProductUpdate = async (req, res) => {
    const result = await AdminProductSaveServices(req)

   res.status(200).json( result )
}























