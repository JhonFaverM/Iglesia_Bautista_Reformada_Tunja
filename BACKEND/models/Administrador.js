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

administradorSchema.methods.generarJWT = function () {
    return jwt.sign({
        _id: this._id, 
        usuario: this.usuario, 
        nombre: this.nombre },"iglesia-tunja", {
        expiresIn: "10m"
    })
        //iglesia-tunja == nombre clave para verificar en middleware node    
}


module.exports = model("Administrador", administradorSchema,"administradores")
