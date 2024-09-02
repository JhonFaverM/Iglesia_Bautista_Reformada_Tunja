const dotenv = require("dotenv").config();


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


const cors = require("cors");


app.use(express.json());
//app.use(cors());
app.use(cors({
    origin: 'https://iglesia-bautista-reformada-tunja-3.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({extended:false}));



app.use('/images', express.static('./images'));  //muestra file planos
app.use('/api/images', imagesRoutes);   // app imagemultiples

app.use('/api/pagination', librosRoutes)

app.use('/libros', express.static('./libros'));
app.use('/api/libros', librosRoutes);   // app articulos

app.use('/miembros', express.static('./miembros'));
app.use('/api/miembros', miembrosRoutes);

app.use('/administradores', administradores);


app.listen(port,()=>{
    console.log("server listening on port " + port);
})
