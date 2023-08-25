const { JsonWebTokenError } = require("jsonwebtoken");
const {Schema, model} = require("mongoose");
const jwt = require("jsonwebtoken");



const administradorSchema = new Schema({
    usuario:{
        type: String
    },
    password:{
        type: String
    },
    nombre:{
        type: String
    }
});

administradorSchema.methods.generarJWT = () => {
    return jwt.sign({
        _id: this._id, 
        usuario: this.usuario, 
        nombre: this.nombre },"iglesia-tunja");
        //nombre cualquiera clave para verificar en middleware node
}


module.exports = model("Administrador", administradorSchema,"administradores")
//administradores = nombre de la coleccion en la base de datos
