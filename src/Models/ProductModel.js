
const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    
    title: { type: String, required: true },
    des: { type: String, required: true },
    price: { type: String, required: true },


    edition: { type: String, required: true },
    vendorPhone: { type: String, required: true },
    vendorName: { type: String, required: true },

    model: { type: String, required: true },

    district: { type: String, required: true },
    subDistrict: { type: String, required: true },
    condition: { type: String, required: true },
    authenticity: { type: String, required: true },
    features: { type: String, required: true },
    negotiable: { type: Boolean, default: false, required: true },
    approved: { type: Boolean, default: false, required: true },



    categoryID: { type: mongoose.Schema.Types.ObjectId, required: true },
    brandID: { type: mongoose.Schema.Types.ObjectId, required: true },


 
}, {
    timestamps: true,
    versionKey: false
})



const ProductModel = mongoose.model('products', dataSchema)

module.exports = ProductModel;

