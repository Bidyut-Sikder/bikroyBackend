const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
    {

        email: { type: String, required: true, lowercase: true, unique: true },

        // name: { type: String },
        firstName: { type: String },
        lastName: { type: String },

        phone: { type: String },
        password: { type: String },
        image: { type: String },
        otp: { type: String },

    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const AdminModel = mongoose.model("admin", dataSchema);

module.exports = AdminModel;

