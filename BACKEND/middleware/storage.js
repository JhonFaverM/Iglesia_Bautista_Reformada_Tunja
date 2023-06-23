const multer = require("multer");  // multer es como un midleware

const diskStorage = multer.diskStorage({  //funcion para guardar la imagen (diskStorage)
    destination: (req, file, callback)=>{
        callback(null, 'images');
    },
    filename: (req, file, callback)=>{
        const fileName = file.originalname;
        callback(null, fileName);
        //const mimeType = file.mimeType.split('/');  //mimeType es para cuando viene el archivo sin la extension o con una que no es
        //const fileType = mimeType(1);
        //const fileName = file.originalname + "." + fileType;
        //callback(null, fileName);
    }
});

const fileFilter = (req, file, callback) => {
    const allowTypes = [ 'image/jpg,', 'image/png', 'image/jpeg', 'application/pdf',];
    console.log(file.mimetype)
    allowTypes.includes(file.mimetype) ? callback(null, true): callback(null, false);
}

let storage = multer({storage: diskStorage, fileFilter: fileFilter}).single('image');
let storageMultiple = multer({storage: diskStorage, fileFilter: fileFilter}).array('images'); //array se puede indicar el max


module.exports = {storage, storageMultiple}; // varios archgivos
//module.exports = storage; // un solo archivo