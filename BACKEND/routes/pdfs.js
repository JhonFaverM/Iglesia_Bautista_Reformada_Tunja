const express = require("express");
const pdfController = require("../controllers/pdfcontro");
const {storage, storageMultiple} = require("../middleware/storage2"); //varios files

const pdfs = express.Router();  //pdfs en lugar de router


//pdfs.get('/', listLibros)

pdfs.get('/', (req, res)=>{
    res.send({"msg":"correcto"})
});

pdfs.post('/multiple', storageMultiple, pdfController.postPdf);


module.exports = pdfs
