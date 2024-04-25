const mongoose = require("mongoose");

const MiembrosSchema = mongoose.Schema({
    nombre_completo: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        require: true
    },
    telefono: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Miembros', MiembrosSchema, "miembros");