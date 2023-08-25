const mongoose = require("mongoose");

const ImageMultipleSchema = mongoose.Schema({
    idAparment: {
        type: String,
        require: true
    },
    imageRutas: {
        type: [String],
        require: true
    }
});

module.exports = mongoose.model('ImageMultiple', ImageMultipleSchema, "imagemultiples");