
const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    categoryName: { type: String, unique: true,required:true },
    categoryImg: { type: String },

}, {
    timestamps: true,
    versionKey: false
})



const CategoryModel = mongoose.model('categories', dataSchema)

module.exports = CategoryModel;

