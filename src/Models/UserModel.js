const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    password: { type: String, select: false },
    image: { type: String },
    role: { type: String, default: "User" },
    age: { type: String },
    otp: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
    toObject: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
