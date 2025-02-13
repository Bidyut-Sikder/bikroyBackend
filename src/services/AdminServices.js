const AdminModel = require("../Models/AdminModel");
const ProductModel = require("../Models/ProductModel");

const { EncodeToken } = require("../utility/TokenHelper");
const fs = require("fs");
const bcrypt = require("bcryptjs");

exports.ReadAdminServices = async (req) => {
  try {
    let user_id = req.headers.user_id;

    let result = await AdminModel.findOne({ _id: user_id });

    return { status: "success", data: result };
  } catch (error) {
    return { status: "success", message: "Something went Wrong." };
  }
};

exports.UpdateAdminServices = async (req) => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;

    // if (req.file !== undefined) {
    //     //console.log(req.file)
    //   //  reqBody.image = `./src/uploads/${req.file.filename}`
    //       reqBody.image = req.file.filename
    //     //  reqBody.image = `./${req.file.path}`
    // }
    // // console.log(reqBody.image)

    // if (reqBody.image) {
    //     const user = await AdminModel.findOne({ _id: user_id })

    //     if (user.image !== undefined) {
    //         fs.unlinkSync(`./src/uploads/${user.image}`)
    //        // fs.unlinkSync(`${user.image}`)
    //     }

    // }

    if (reqBody.email !== undefined) {
      return { status: "fail", message: "Profile cannot be updated." };
    }

    await AdminModel.updateOne({ _id: user_id }, { $set: { ...reqBody } });
    //  await UserModel.updateOne({ _id: user_id }, { $set: reqBody })

    return { status: "success", message: "Profile save success" };
  } catch (error) {
    console.log(error);
    return { status: "fail", message: "Something went wrong" };
  }

  // try {
  //     let user_id = req.headers.user_id;
  //     let reqBody = req.body
  //   //  reqBody.userID = user_id;

  //     await AdminModel.updateOne({ _id: user_id }, { $set: reqBody })

  //     return { status: 'success', message: 'Profile save success' }
  // } catch (error) {
  //     return { status: 'fail', message: 'Something went wrong' }

  //     console.log(error.toString())
  // }
};

exports.AdminLoginServies = async (req) => {
  try {
    const email = req.params.email;
    const password = req.params.password;

    //         const user = await AdminModel.findOne({ email: email,password: password })
    //    //console.log(user)
    //     //if(user===null) return { status: 'fail', message: 'Invalid email or password.' }

    //         if (user === null) {
    //             return { status: 'fail', message: 'Invalid email or password.' }
    //         }
    //         let token = EncodeToken(email, user._id.toString())

    //         return { status: 'success', token }

    const admin = await AdminModel.findOne({ email: email }); //.select("+password");

    if (admin === null) {
      return { status: "fail", message: "Invalid email or password." };
    }
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return { status: "fail", message: "Your Password is Incorrect" };
    }

    let token = EncodeToken(email, admin._id.toString());

    return { status: "success", token };
  } catch (error) {
    console.log(error);
    return { status: "fail", message: "Something went wrong." };
  }
};

exports.AdminProductServices = async (req) => {
  try {
    const products = await ProductModel.find({ approved: false });

    return { status: "success", data: products };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};

exports.AdminProductSaveServices = async (req) => {
  try {
    const productID = req.params.id;

    const data = await ProductModel.updateOne(
      { _id: productID },
      { $set: { ...req.body } }
    );
    //  console.log(data)
    return { status: "success", message: "Updated successfully." };
  } catch (err) {
    return { status: "fail", data: err.toString() };
  }
};

////////////////////////////////////////////////

// exports.AdminSignUpServies = async (req) => {

//     try {

//         const email = req.body.email;
//         //  console.log(email)
//         let code = Math.floor(100000 + Math.random() * 900000)
//         let EmailText = `Your verification code is ${code}`

//         let EmailSubject = 'Email verification '
//         const reqBody = req.body;
//         reqBody.otp = code

//         const exists = await UserModel.find({ email: email })

//         if (exists.length === 0) {
//             //  await EmailSend(email, EmailText, EmailSubject)

//             const user = await UserModel.create(reqBody)

//             let token = EncodeToken(email, user['_id'].toString())

//             return { status: 'success', token: token }
//         }

//         return { status: 'fail', message: 'Email already exists' }

//     } catch (error) {
//         //  console.log(error)
//         return { status: 'fail', message: 'Something went wrong.' }

//     }

// }

// exports.AdminOTPServies = async (req) => {

//     try {
//         const email = req.params.email;
//         let code = Math.floor(100000 + Math.random() * 900000)
//         let EmailText = `Your verification code is ${code}`

//         let EmailSubject = 'Email verification '

//         //  await EmailSend(email, EmailText, EmailSubject)

//         await UserModel.updateOne({ email: email }, { $set: { otp: code } }, { upsert: true })

//         return { status: 'success', message: '6 digit OTP has been sent.' }

//     } catch (error) {
//         console.log(error)
//         return { status: 'fail', message: 'Something went wrong.' }

//     }

// }

// exports.AdminVeryfyOTPLoginServies = async (req) => {

//     try {
//         const email = req.params.email;
//         const otp = req.params.otp;

//         let total = await UserModel.find({ email: email, otp: otp }).count('total');
//         if (total === 1) {
//             //user_id reading
//             let user_id = await UserModel.find({ email: email, otp: otp }).select('_id')
//             //console.log(user_id[0]._id.toString())
//             let token = EncodeToken(email, user_id[0]._id.toString())

//             await UserModel.updateOne({ email: email }, { $set: { otp: "0" } })
//             //  await UserModel.updateOne({ email: email }, { $set: { otp: "0" } })

//             return { status: 'success', message: 'Valid OTP', token: token }
//         } else {
//             return { status: 'fail', message: 'Invalid OTP' }

//         }

//     } catch (error) {
//         console.log(error)
//         return { status: 'fail', message: 'Invalid OTP' }

//     }
// }

// exports.AdminSaveProfileServies = async (req) => {

//     try {
//         let user_id = req.headers.user_id;
//         let reqBody = req.body
//         reqBody.userID = user_id;

//         await UserModel.updateOne({ _id: user_id }, { $set: reqBody }, { upsert: true })

//         return { status: 'success', message: 'Profile save success' }
//     } catch (error) {
//         return { status: 'fail', message: 'Something went wrong' }

//         console.log(error.toString())
//     }
//     // { $set: reqBody }, { upsert: true }
// }
