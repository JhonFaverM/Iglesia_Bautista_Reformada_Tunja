const libro = require("../models/libro");
const libros = require("../models/libro");

pagination = async (req, res)=>{
    const pdf = await libros.find();
    res.status(200).json(pdf);
}

getImages = async (req, res)=>{
    const pdf = await libros.find();
    res.status(200).json(pdf);
}

postLibro = async (req, res)=>{
    console.log("req.file: " +req.files)
    const {nameBook} = req.body;  //desestructurar
    const bookRutas = []; //`http://localhost:${process.env.PORT}/images/${req.file.filename}`; //npmbre varable coincide con el del modelo
    req.files.forEach(element => {
        console.log(element.filename)
        bookRutas.push(`http://localhost:${process.env.PORT}/libros/${element.filename}`); //npmbre de la carpeta donde guardamos las imagenes (libros)
    });
    console.log(bookRutas)
    const libro = new libros({
        nameBook,
        bookRutas
    });
    const libroCreado = await libro.save();
    res.status(200).json({
        ...libroCreado._doc //... = spread operator//
    })
}

//elaborar funciones 
const createLibro = (req, res)=>{}
const actualizarLibro = (req, res)=>{}


module.exports = {
    postLibro,
    getImages,
    pagination
}



//const image = require("../models/image");
//const imageMultiple = require("../models/imageMultiple");
