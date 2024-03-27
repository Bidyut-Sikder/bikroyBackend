
const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({

    email: { type: String, required: true, lowercase: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    password: { type: String },
    image: { type: String },
    role: { type: String, default: 'User' },
    age: { type: String },
    otp: { type: String },


}, {
    timestamps: true,
    versionKey: false
})



const UserModel = mongoose.model('users', dataSchema)

module.exports = UserModel;





