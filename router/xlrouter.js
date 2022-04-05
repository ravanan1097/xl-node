const express=require("express");
const router=express.Router();
const xlfilter=require("../middleware/xlUpload");
const xlController=require("../controller/xlController");

router.post("/xlupload",xlfilter.single("file"),xlController.uploadFile);
router.get("/xldata",xlController.excelData);
router.get("/xldownload",xlController.xlDownload);

module.exports=router;