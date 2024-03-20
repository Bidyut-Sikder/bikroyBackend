//const ProfileModel = require("../Models/ProfileModel");
const UserModel = require("../Models/UserModel");
const EmailSend = require("../utility/EmailHelper");
const { EncodeToken } = require("../utility/TokenHelper");
const fs = require('fs')






const SignUpServies = async (req) => {

    try {

        const email = req.body.email;
        //  console.log(email)
        let code = Math.floor(100000 + Math.random() * 900000)
        let EmailText = `Your verification code is ${code}`

        let EmailSubject = 'Email verification '
        const reqBody = req.body;
        reqBody.otp = code



        const exists = await UserModel.find({ email: email })


        if (exists.length === 0) {
            //  await EmailSend(email, EmailText, EmailSubject)

            const user = await UserModel.create(reqBody)

            let token = EncodeToken(email, user['_id'].toString())

            return { status: 'success', token: token }
        }

        return { status: 'fail', message: 'Email already exists' }



    } catch (error) {
        //  console.log(error)
        return { status: 'fail', message: 'Something went wrong.' }

    }





}









const UserLoginServies = async (req) => {

    try {
        const email = req.params.email;
        const password = req.params.password;
        let code = Math.floor(100000 + Math.random() * 900000)
        let EmailText = `Your verification code is ${code}`

        let EmailSubject = 'Email verification '

        //  await EmailSend(email, EmailText, EmailSubject)



        const user = await UserModel.findOne({ email: email, password })

        if (user === null) {
            return { status: 'fail', message: 'Invalid email or password.' }
        }
        let token = EncodeToken(email, user._id.toString())

        return { status: 'success', token }


    } catch (error) {
        console.log(error)
        return { status: 'fail', message: 'Something went wrong.' }

    }





}

















const UpdateProfileServies = async (req) => {

    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body

        // console.log(req.file !== undefined)

        if (req.file !== undefined) {
            reqBody.image = `./${req.file.path}`
        }
        //  console.log(reqBody.image)

        if (reqBody.image) {
            const user = await UserModel.findOne({ _id: user_id })


            if (user.image !== undefined) {
                fs.unlinkSync(`${user.image}`)
            }


        } 

        if (reqBody.email !== undefined) {

            return { status: 'fail', message: 'Profile cannot be updated.' }

        }
        // console.log(reqBody)

        await UserModel.updateOne({ _id: user_id }, { $set: reqBody })
        //  await UserModel.updateOne({ _id: user_id }, { $set: reqBody })

        return { status: 'success', message: 'Profile save success' }
    } catch (error) {

        console.log(error)
        return { status: 'fail', message: 'Something went wrong' }


    }

}




const ReadProfileServies = async (req) => {

    try {
        let user_id = req.headers.user_id;

        let result = await UserModel.find({ userID: user_id }, { otp: 0 })

        return { status: 'success', data: result }
    } catch (error) {
        return { status: 'success', message: 'Something went Wrong.' }

    }
}















































//////////////////////////////////////////////////////////////////////////////////


const UserOTPServies = async (req) => {

    try {
        const email = req.params.email;
        let code = Math.floor(100000 + Math.random() * 900000)
        let EmailText = `Your verification code is ${code}`

        let EmailSubject = 'Email verification '

        //  await EmailSend(email, EmailText, EmailSubject)


        await UserModel.updateOne({ email: email }, { $set: { otp: code } }, { upsert: true })

        return { status: 'success', message: '6 digit OTP has been sent.' }


    } catch (error) {
        console.log(error)
        return { status: 'fail', message: 'Something went wrong.' }

    }





}


const VeryfyOTPLoginServies = async (req) => {

    try {
        const email = req.params.email;
        const otp = req.params.otp;



        let total = await UserModel.find({ email: email, otp: otp }).count('total');
        if (total === 1) {
            //user_id reading
            let user_id = await UserModel.find({ email: email, otp: otp }).select('_id')
            //console.log(user_id[0]._id.toString())
            let token = EncodeToken(email, user_id[0]._id.toString())

            await UserModel.updateOne({ email: email }, { $set: { otp: "0" } })
            //  await UserModel.updateOne({ email: email }, { $set: { otp: "0" } })

            return { status: 'success', message: 'Valid OTP', token: token }
        } else {
            return { status: 'fail', message: 'Invalid OTP' }

        }



    } catch (error) {
        console.log(error)
        return { status: 'fail', message: 'Invalid OTP' }

    }
}

const SaveProfileServies = async (req) => {

    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body
        reqBody.userID = user_id;


        await UserModel.updateOne({ _id: user_id }, { $set: reqBody }, { upsert: true })
        //  await UserModel.updateOne({ _id: user_id }, { $set: reqBody })

        return { status: 'success', message: 'Profile save success' }
    } catch (error) {
        return { status: 'fail', message: 'Something went wrong' }


    }

}




module.exports = {
    UpdateProfileServies,
    SignUpServies,
    UserLoginServies,
    UserOTPServies,
    VeryfyOTPLoginServies,
    SaveProfileServies,
    ReadProfileServies
}


















