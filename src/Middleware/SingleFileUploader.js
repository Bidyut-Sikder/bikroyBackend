const multer = require("multer")
const path = require("path")

exports.SingleFileUploader = (fileName) => {


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
            fileSize: 10000000 // Size
        },

        //limits: { fieldSize: 50000000 }, //5mb limit
        fileFilter: (req, file, cb) => {
            if (file.fieldname === 'file') {
                if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
                    cb(null, true)
                } else {
                    cb(new Error("Only .jpg .png .jpeg format is allowed."))

                }
            }




        }
    })


    return upload.single(fileName)
    // return 'bidyut'

}
