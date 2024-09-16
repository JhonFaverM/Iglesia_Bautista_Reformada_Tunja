const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client } = require('@aws-sdk/client-s3');  // AWS SDK v3 S3Client
const { Upload } = require('@aws-sdk/lib-storage');  // Para manejar la subida de archivos

// Configuracion de AWS S3
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
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
        bucket: process.env.AWS_BUCKET_NAME, // Nombre de variable bucket en S3
        acl: 'public-read',  // Otorga permisos de lectura pública a los archivos
        key: (req, file, cb) => {
            cb(null, Date.now().toString() + '-' + file.originalname); // Asigna un nombre único al archivo
        }
    }),
    fileFilter: fileFilter,
}).array('images');  // Cambia 'images' si tu campo tiene otro nombre

module.exports = { storageS3 };
