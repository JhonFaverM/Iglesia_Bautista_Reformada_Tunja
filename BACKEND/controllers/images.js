//const image = require("../models/image");
const imageMultiples = require("../models/imageMultiple");

getImages = async (req, res)=>{
    const images = await imageMultiples.find();
    res.status(200).json(images);
}


postMultipleImage = async (req, res)=>{
    console.log("req.file: " +req.files)
    const {name_foto} = req.body;  //desestructurar
    const imageRutas = []; //`http://localhost:${process.env.PORT}/images/${req.file.filename}`; //npmbre varable coincide con el del modelo
    req.files.forEach(element => {
        console.log(element.filename)
        imageRutas.push(`http://localhost:${process.env.PORT}/images/${element.filename}`); //npmbre varable coincide con el del modelo
    });
    console.log(imageRutas)
    const image = new imageMultiples({
        name_foto,
       // ubicacion,
        imageRutas
    });
    const imagenCreada = await image.save();
    res.status(200).json({
        ...imagenCreada._doc //... = spread operator//
    })
}


const deleteHistoria = (req, res) => {
    const name_foto = req.params.name_foto;
    imageMultiples.deleteOne({ name_foto }, (err, mongoResponse) => {
        if (err) {
            return res.status(500).send("Error al eliminar el documento"); 
        } else if (mongoResponse.deletedCount === 1) {
            return res.status(200).send("Documento eliminado correctamente");
        } else {
            return res.status(404).send("No se encontró ningún documento para eliminar"); 
        }
    });
}




module.exports = {
    deleteHistoria,
    postMultipleImage,
    getImages
}