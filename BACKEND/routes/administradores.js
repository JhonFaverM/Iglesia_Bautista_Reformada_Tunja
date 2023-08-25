const express = require("express");

const administradores = express.Router();
const {login, listAdministradores} = require("../controllers/Administradores");


administradores.post('/login', login); //login es una variable

administradores.get('/', listAdministradores);

 
 
 
 module.exports = {
     administradores
 }


 