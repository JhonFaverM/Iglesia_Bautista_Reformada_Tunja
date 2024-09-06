const libros = require("../models/libro");
const mongoosePaginate = require('mongoose-paginate-v2');
const AWS = require('aws-sdk');
const sharp = require('sharp');

// Configurar el SDK de AWS
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

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

/*Funcion que trae la ruta de imágenes de libros */
getImages = async (req, res) => {
    try {
        const rutasImages = await libros.find();
        res.status(200).json(rutasImages);
    } catch (error) {
        console.error('Error al obtener las rutas de imágenes:', error);
        res.status(500).json({ message: "Ocurrió un error al obtener las imágenes." });
    }
};

postLibro = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No se subió ninguna imagen o el tipo de archivo es inválido. Solo se permiten imágenes (jpg, png, jpeg)." });
        }

        const { nameBook, article } = req.body;
        const bookRutas = [];

        for (const file of req.files) {
            // Comprimir la imagen
            const compressedBuffer = await sharp(file.buffer)
                .resize(250) // Redimensiona la imagen a un ancho máximo de 250px
                .jpeg({ quality: 70 }) // Comprime la imagen con un 70% de calidad
                .toBuffer();

            // Configurar los parámetros para subir a S3
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `libros/${Date.now()}_${file.originalname}`,  // Nombre único para la imagen en el bucket
                Body: compressedBuffer,
                ContentType: 'image/jpeg',  // Tipo de archivo que se guarda
                ACL: 'public-read'  // Permisos para que sea pública la URL
            };

            // Subir la imagen a S3
            const s3Response = await s3.upload(params).promise();

            // Guardar la URL de la imagen en el array bookRutas
            bookRutas.push(s3Response.Location);
        }

        // Guardar el libro en MongoDB con las rutas de las imágenes en S3
        const libro = new libros({
            nameBook,
            article,
            bookRutas   // URLs de las imágenes en S3
        });

        const libroCreado = await libro.save();
        res.status(200).json({
            ...libroCreado._doc // Spread operator para devolver los datos del libro
        });
    } catch (error) {
        console.error('Error al subir el libro:', error);
        res.status(500).json({ message: "Ocurrió un error al subir el libro." });
    }
};

/* Función para eliminar un libro */
const deleteArticulo = async (req, res) => {
    const nameBook = req.params.nameBook;
    try {
        const mongoResponse = await libros.deleteOne({ nameBook });
        if (mongoResponse.deletedCount === 1) {
            res.status(200).json({ message: "Documento eliminado correctamente" });
        } else {
            res.status(404).json({ message: "No se encontró ningún documento para eliminar" });
        }
    } catch (error) {
        console.error('Error al eliminar el documento:', error);
        res.status(500).json({ message: "Error al eliminar el documento" });
    }
};

module.exports = {
    deleteArticulo,
    postLibro,
    getImages,
    pagination,
};
