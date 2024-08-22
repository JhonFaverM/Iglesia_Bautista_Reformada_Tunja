const libros = require("../models/libro");
const mongoosePaginate = require('mongoose-paginate-v2');



pagination = async (req, res) => {
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 4;

   try {
       const options = {
           page: page,
           limit: limit
       };

       const result = await libros.paginate({}, options);
       res.status(200).json({
           page: result.page,
           totalPages: result.totalPages,
           books: result.docs
       });
   } catch (error) {
       console.error(error);
       res.status(500).json({ message: "Error al paginar los libros" });
   }
};


/*Funcion que trae la ruta de imagenes libros */
getImages = async (req, res)=>{
   const rutasImages = await libros.find();
   res.status(200).json(rutasImages);
}


postLibro = async (req, res)=>{
   console.log("req.file: " +req.files)
   const {nameBook, article} = req.body;
   const bookRutas = [];
   req.files.forEach(element => {
       console.log(element.filename)
       bookRutas.push(`https://iglesia-bautista-reformada-tunja-2.onrender.com:${process.env.APP_PORT}/libros/${element.filename}`);
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

/* Function to delete a book */
const deleteArticulo = async (req, res) => {
   const nameBook = req.params.nameBook;
   try {
       const mongoResponse = await libros.deleteOne({ nameBook });
       if (mongoResponse.deletedCount === 1) {
           res.status(200).json({message: "Documento eliminado correctamente" });
       } else {
           res.status(404).json({message:"No se encontró ningún documento para eliminar"});
       }
   } catch (error) {
       console.error('Error al eliminar el documento:', error);
       res.status(500).json({message:"Error al eliminar el documento"});
   }
};


module.exports = {
   deleteArticulo,
   postLibro,
   getImages,
   pagination,
}