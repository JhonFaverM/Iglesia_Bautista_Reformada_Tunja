const express = require("express");
const routes = express.Router();
const libroController = require("../controllers/libros");

//const { deleteArticulo, postLibro, getImages, pagination } = require('../controllers/libros')
const {pagination} = require('../controllers/libros')


const { storage, storageMultiple} = require("../middleware/storage1");
const { deleteArticulo } = require('../controllers/libros')

const { verificarToken } = require("../middleware/verificarToken")


routes.get('/pagination', libroController.pagination);
routes.get('/', libroController.getImages); //Metodo de libro controller
routes.post('/multiple', storageMultiple, libroController.postLibro);

//router.delete('/', deleteArticulo);


routes.delete("/nameBook/:nameBook", deleteArticulo);
//routes.delete("/nameBook/:nameBook", verificarToken, deleteArticulo);





module.exports = routes





