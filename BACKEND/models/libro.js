const mongoose = require("mongoose");

const librosSchema = mongoose.Schema({
    nameBook: {
        type: String,
        require: true
    },
    bookRutas: {
        type: [String],
        require: true
    }
});

module.exports = mongoose.model('Libros', librosSchema,);