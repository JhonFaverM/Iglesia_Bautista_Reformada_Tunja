const express = require("express");
const imageController = require("../controllers/images");
//const storage = require("../midleware/storage"); una solo unidad de file
const {storage, storageMultiple} = require("../middleware/storage"); //varios files
const controller = require('../controllers/upload') //ejmplo up



const router = express.Router();

router.get('/', imageController.getImages);
//router.post('/', storage, imageController.postImage)    //quitar si no funciona para subir pdf
router.post('/multiple', storageMultiple, imageController.postMultipleImage)

//router.post()

router.post(
    controller.uploadFile   //ejemplo up
)



module.exports = router

module.exports = router