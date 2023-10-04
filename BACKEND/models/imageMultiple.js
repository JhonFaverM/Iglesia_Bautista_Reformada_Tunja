const mongoose = require("mongoose");

const ImageMultipleSchema = mongoose.Schema({
    name_foto: {
        type: String,
        require: true
    },
    imageRutas: {
        type: [String],
        require: true
    }
});

module.exports = mongoose.model('ImageMultiples', ImageMultipleSchema, "imageMultiples");