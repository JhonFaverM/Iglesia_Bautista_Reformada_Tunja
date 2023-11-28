const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./database/db");
const imagesRoutes = require("./routes/images");
const librosRoutes = require("./routes/libros");

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

app.use('/administradores', administradores);//la segunda admis es una variable






app.listen(port,()=>{
    console.log("server listening on port " + port);
})