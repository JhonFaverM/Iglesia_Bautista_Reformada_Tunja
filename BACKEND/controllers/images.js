//const image = require("../models/image");
const imageMultiple = require("../models/imageMultiple");

getImages = async (req, res)=>{
    const images = await imageMultiple.find();
    res.status(200).json(images);
}


postMultipleImage = async (req, res)=>{
    console.log("req.file: " +req.files)
    const {idAparment, ubicacion} = req.body;  //desestructurar
    const imageRutas = []; //`http://localhost:${process.env.PORT}/images/${req.file.filename}`; //npmbre varable coincide con el del modelo
    req.files.forEach(element => {
        console.log(element.filename)
        imageRutas.push(`http://localhost:${process.env.PORT}/images/${element.filename}`); //npmbre varable coincide con el del modelo
    });
    console.log(imageRutas)
    const image = new imageMultiple({
        idAparment,
        ubicacion,
        imageRutas
    });
    const imagenCreada = await image.save();
    res.status(200).json({
        ...imagenCreada._doc //... = spread operator//
    })
}




module.exports = {
    postMultipleImage,
    getImages
}