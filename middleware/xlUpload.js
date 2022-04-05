const multer = require("multer");
const path = require("path");
require('dotenv').config();

let excelFilter = (req, file, cb) => {

    if(path.extname(file.originalname)=='.xls' || path.extname(file.originalname)=='.xlsx' || path.extname(file.originalname)=='.ods')
    cb(null, true)

    else cb("Please Upload Excel File", false);
};

let storage = multer.diskStorage({
    destination: (req, file, cb) => {

        cb(null, process.env.ASSET_PATH+"/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, `${Date.now()}`+'-'+`${file.originalname}`)
    }
});

let uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;