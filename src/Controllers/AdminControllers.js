const { ReadAdminServices, UpdateAdminServices, AdminLoginServies, AdminProductServices, AdminProductSaveServices } = require("../services/AdminServices")



exports.ReadAdmin = async (req, res) => {
    const result = await ReadAdminServices(req)
    res.status(200).json(result)
}


exports.UpdateAdmin = async (req, res) => {
    const result = await UpdateAdminServices(req)
    res.status(200).json(result)
}




exports.AdminLogin = async (req, res) => {
    const result = await AdminLoginServies(req)


    if (result['status'] === 'success') {
        //set cookie options
        let cookieOption = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        }
        //set cookie
        res.cookie('token', result['token'], cookieOption)

        return res.status(200).json(result)
    } else {
        return res.status(200).json(result)
    }

}




exports.AdminProduct = async (req, res) => {
    const result = await AdminProductServices(req)

    res.status(200).json(result)
}

exports.AdminProductUpdate = async (req, res) => {
    const result = await AdminProductSaveServices(req)

    res.status(200).json(result)
}























