const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

// Configuración de AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// Filtro de archivos para aceptar solo imágenes
const fileFilter = (req, file, callback) => {
    const allowTypes = ['image/jpg', 'image/png', 'image/jpeg'];
    if (allowTypes.includes(file.mimetype)) {
        callback(null, true);  // Acepta el archivo
    } else {
        callback(new Error('El tipo de archivo no es válido. Solo se permiten imágenes (jpg, png, jpeg).'), false);  // Rechaza el archivo
    }
};

// Configuración de multer para S3
const storageS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.article-ibrt, // Nombre de tu bucket en S3
        acl: 'public-read',  // Otorga permisos de lectura pública a los archivos
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname); // Asigna un nombre único al archivo
        }
    }),
    fileFilter: fileFilter,
}).array('images');  // Cambia 'images' si tu campo tiene otro nombre

module.exports = { storageS3 };
