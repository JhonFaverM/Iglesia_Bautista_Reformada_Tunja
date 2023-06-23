const express = require("express");
const libroController = require("../controllers/libros");
const {storage, storageMultiple} = require("../middleware/storage1");

const router = express.Router();

//const imageController = require("../controllers/images");
//const {storageMultiple} = require("../middleware/storage"); //varios files

router.get('/', libroController.getImages);
router.post('/multiple', storageMultiple, libroController.postLibro);
router.get('/', libroController.pagination);





module.exports = router




