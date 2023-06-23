const mongoose = require("mongoose");

const pdfsSchema = mongoose.Schema({
    tema: {
        type: String,
        require: true
    },
    nombreLibro: {
        type: String,
        require: true
    },
    nombreAutor: {
        type: String,
        require: true
    },
    rutaLibros: {
        type: [String],
        require: true
    }
});

module.exports = mongoose.model('Pdfs', pdfsSchema,);