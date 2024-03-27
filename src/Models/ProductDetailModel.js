
const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    img1: { type: String,  },
    img2: { type: String,  },
    img3: { type: String,  },
    img4: { type: String,  },
    img5: { type: String },



    des: { type: String },
 

    productID: { type: mongoose.Schema.Types.ObjectId, required: true },



}, {
    timestamps: true,
    versionKey: false
})



const ProductDetailsModel = mongoose.model('productdetails', dataSchema)

module.exports = ProductDetailsModel;

