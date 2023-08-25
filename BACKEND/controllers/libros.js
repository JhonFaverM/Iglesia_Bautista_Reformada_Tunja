//const libro = require("../models/libro");
const libros = require("../models/libro");


/*Corroborar estas dos funciones */
pagination = async (req, res)=>{
    const pdf = await libros.find();
    res.status(200).json(pdf);
}

/*Funcion que trae la ruta de imagenes libros */
getImages = async (req, res)=>{
    console.log(req.asesor)
    const rutasImages = await libros.find();
    res.status(200).json(rutasImages);
}

postLibro = async (req, res)=>{
    console.log("req.file: " +req.files)
    const {nameBook, article} = req.body;  //desestructurar
    const bookRutas = []; //`http://localhost:${process.env.PORT}/images/${req.file.filename}`; //npmbre varable coincide con el del modelo
    req.files.forEach(element => {
        console.log(element.filename)
        bookRutas.push(`http://localhost:${process.env.PORT}/libros/${element.filename}`); //npmbre de la carpeta donde guardamos las imagenes (libros)
    });
    console.log(bookRutas)
    const libro = new libros({
        nameBook,
        article,
        bookRutas
    });
    const libroCreado = await libro.save();
    res.status(200).json({
        ...libroCreado._doc //... = spread operator//
    })
}

const deleteArticulo = (req, res) => {
    const nameBook = req.params.nameBook;
    libros.deleteOne({ nameBook }, (err, mongoResponse) => {
        if (err) {
            return res.status(500).send("Error al eliminar el documento"); 
        } else if (mongoResponse.deletedCount === 1) {
            return res.status(200).send("Documento eliminado correctamente");
        } else {
            return res.status(404).send("No se encontró ningún documento para eliminar"); 
        }
    });
}



/*
const deleteArticulo = (req, res) => {
    libros.deleteOne({}, (err, mongoResponse)=>{
        if(err) return res.send(err)
        console.log(mongoResponse)
        return mongoResponse.deletedCount === 1 ? res.send("Se eliminó un documento") : res.send("No se eliminó ningun documento")
    })
}
*/

//elaborar funciones 
const createLibro = (req, res)=>{}
const actualizarLibro = (req, res)=>{}




module.exports = {
    deleteArticulo,
    postLibro,
    getImages,
    pagination,
}



//const image = require("../models/image");
//const imageMultiple = require("../models/imageMultiple");
