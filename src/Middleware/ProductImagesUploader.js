

// const multer = require('multer')


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: (req, file, cb) => {
//         var ext = file.originalname.substr(file, originalname.lastIndexOf('.'))

//         cb(null, file.fieldname + "-" + Date.now() + ext);  //ren
//     }
// })



// module.exports = store = multer({ storage: storage })




const multer = require("multer")
const path = require("path")

exports.ProductImagesUploader = (fileName, fileNumber) => {


    const storage = multer.diskStorage({
        destination: (req, file, cd) => {
            //  cb(null, 'uploads/')
            return cd(null, './src/uploads')

        },
        filename: (req, file, cb) => {

            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") + "-" + Date.now()
            return cb(null, fileName + fileExt)

        }
    })


    const upload = multer({
        storage: storage,
        limits: {
            // fileSize: 1024 * 1024 * fileNumber // Size
        },

        // limits: { fieldSize: 50000000 }, //5mb limit
        // fileFilter: (req, file, cb) => {
        //     if (file.fieldname === 'file') {
        //         if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        //             cb(null, true)
        //         } else {
        //             cb(new Error("Only .jpg .png .jpeg format is allowed."))

        //         }
        //     }




        // }
    })
 


    return upload.array(fileName, fileNumber)
    // return 'bidyut'

}





exports.uploads = async (req, res, next) => {

    const files = req.files;
    if (!files) {
        const error = new Error("Please choose at least one image.")
        error.httpStatusCode = 400
        return next(error);
    }
    res.json(files)

}





