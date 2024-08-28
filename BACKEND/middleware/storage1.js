const multer = require("multer");  // multer es como un midleware


const diskStorage = multer.diskStorage({  //funcion para guardar la imagen (diskStorage)
    destination: (req, file, callback)=>{
        callback(null, 'libros');   //nombre de la carpeta /ruta
    },
    filename: (req, file, callback)=>{
        const fileName = file.originalname;
        callback(null, fileName);   // guarda el archivo con el nombre original
    }
});

// Filtro de archivos para aceptar solo imágenes
const fileFilter = (req, file, callback) => {
    // Lista de tipos MIME permitidos
    const allowTypes = ['image/jpg', 'image/png', 'image/jpeg'];

    // Verifica si el tipo MIME del archivo está en la lista de tipos permitidos
    if (allowTypes.includes(file.mimetype)) {
        callback(null, true); // Acepta el archivo
    } else {
        callback(new Error('El tipo de archivo no es válido. Solo se permiten imágenes (jpg, png, jpeg).'), false); // Rechaza el archivo
    }
}

let storageMultiple = multer({storage: diskStorage, fileFilter: fileFilter}).array('images');


module.exports = {storageMultiple};
