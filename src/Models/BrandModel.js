const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    brandName: { type: String, unique: true },
    brandImg: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BrandModel = mongoose.model("brands", dataSchema);

module.exports = BrandModel;

