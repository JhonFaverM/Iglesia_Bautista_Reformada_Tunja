const express = require("express");
const routes = express.Router();    //Crea un objeto Router de Express para definir las rutas.
const libroController = require("../controllers/libros");

const {pagination} = require('../controllers/libros')


const { storageMultiple} = require("../middleware/storage1");
const { deleteArticulo } = require('../controllers/libros')

const { verificarToken } = require("../middleware/verificarToken");


routes.get('/pagination', libroController.pagination);
routes.get('/', libroController.getImages); //Metodo de libro controller
routes.post('/multiple', storageMultiple, libroController.postLibro);

routes.delete("/nameBook/:nameBook", verificarToken, libroController.deleteArticulo);




module.exports = routes
