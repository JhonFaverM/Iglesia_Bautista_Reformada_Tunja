const dotenv = require("dotenv").config();
console.log("MONGO_HOST:", process.env.MONGO_HOST);
console.log("MONGO_USER:", process.env.MONGO_USER);
console.log("MONGO_PASSWORD:", process.env.MONGO_PASSWORD);
console.log("MONGO_PORT:", process.env.MONGO_PORT);
console.log("MONGO_DATABASE:", process.env.MONGO_DATABASE);

const express = require("express");
const app = express();
const port = process.env.APP_PORT || 3001;
const DatabaseConexion = require("./database/db");
const db = new DatabaseConexion();
db.connect();

const imagesRoutes = require("./routes/images");
const librosRoutes = require("./routes/libros");
const miembrosRoutes = require("./routes/miembros");

const {administradores} = require("./routes/administradores");//desestructurar
//const { libros } = require("./routes/libros")


const pdfsRoutes = require("./routes/pdfs");
const cors = require("cors");


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));


//app.use('/libros', libros)

app.use('/images', express.static('./images'));  //muestra file planos
app.use('/api/images', imagesRoutes);   // app imagemultiples

app.use('/api/pagination', librosRoutes)

app.use('/libros', express.static('./libros'));
app.use('/api/libros', librosRoutes);   // app articulos



app.use('/pdfs', express.static('./pdfs')); //static text.txt
app.use('/api/pdfs', pdfsRoutes);

app.use('/miembros', express.static('./miembros'));
app.use('/api/miembros', miembrosRoutes);

app.use('/administradores', administradores);//la segunda admis es una variable


app.listen(port,()=>{
    console.log("server listening on port " + port);
})