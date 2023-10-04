const express = require("express");
const imageController = require("../controllers/images");
//const storage = require("../midleware/storage"); una solo unidad de file
const {storage, storageMultiple} = require("../middleware/storage"); //varios files


const { deleteHistoria } = require('../controllers/images')
const router = express.Router();

router.get('/', imageController.getImages);
router.post('/multiple', storageMultiple, imageController.postMultipleImage);

//router.post()
router.delete('/name_foto/:name_foto', deleteHistoria);


module.exports = router

