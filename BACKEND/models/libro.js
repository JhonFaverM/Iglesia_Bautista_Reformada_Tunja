const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');


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

librosSchema.plugin(mongoosePaginate);
const Libro = mongoose.model('Libro', librosSchema);




module.exports = mongoose.model('Libros', librosSchema, "libros");




