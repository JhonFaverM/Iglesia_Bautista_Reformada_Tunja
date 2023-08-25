const mongoose = require("mongoose");

const librosSchema = mongoose.Schema({
    nameBook: {
        type: String,
        required: true
    },
    article: {
        type: String,
        required: true
    },
    bookRutas: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('Libros', librosSchema, "libros");