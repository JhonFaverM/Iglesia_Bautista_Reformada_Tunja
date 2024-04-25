const express = require("express");
const routes = express.Router();    //Crea un objeto Router de Express para definir las rutas.
const libroController = require("../controllers/libros");   // Importa el controlador de libros que contiene la lógica para manejar las solicitudes relacionadas con libros.

//const { deleteArticulo, postLibro, getImages, pagination } = require('../controllers/libros')
const {pagination} = require('../controllers/libros')   //Importa la función pagination del controlador de libros.


const { storage, storageMultiple} = require("../middleware/storage1");  //Importa funciones de middleware relacionadas con el almacenamiento de archivos.
const { deleteArticulo } = require('../controllers/libros') // Importa la función deleteArticulo del controlador de libros.

const { verificarToken } = require("../middleware/verificarToken")  // Importa la función verificarToken del middleware para verificar tokens de autenticación.


routes.get('/pagination', libroController.pagination);
routes.get('/', libroController.getImages); //Metodo de libro controller
routes.post('/multiple', storageMultiple, libroController.postLibro);

//router.delete('/', deleteArticulo);


routes.delete("/nameBook/:nameBook", deleteArticulo);
//routes.delete("/nameBook/:nameBook", verificarToken, deleteArticulo);





module.exports = routes





