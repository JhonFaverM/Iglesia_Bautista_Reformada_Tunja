const pdfs = require("../models/pdf");




postPdf = async (req, res)=>{
    const {tema} = req.body;
    const {nombreLibro} = req.body;
    const {nombreAutor} = req.body;
    const rutaLibros = [];
    req.files.forEach(element => {
        console.log(element.filename)
        rutaLibros.push(`http://localhost:${process.env.PORT}/pdfs/${element.filename}`); //npmbre de la carpeta donde guardamos las imagenes (pdfs)
    });
    console.log(rutaLibros)
    const pdf = new pdfs({
        tema,
        nombreLibro,
        nombreAutor,
        rutaLibros
    });
    const pdfCreado = await pdf.save();
    res.status(200).json({
        ...pdfCreado._doc //... = spread operator//
    })
}




module.exports = {
    postLibro,
    postPdf
}