const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    imageRuta: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Image', imageSchema, 'image');