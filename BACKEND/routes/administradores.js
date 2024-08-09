const express = require("express");

const administradores = express.Router();
const {login, listAdministradores, createAdmin} = require("../controllers/Administradores");


administradores.post('/login', login); //login es una variable
administradores.get('/', listAdministradores);
administradores.post('/createAdm', createAdmin);

 
 
 
 module.exports = {
    administradores
}
