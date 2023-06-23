const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./database/db");
const imagesRoutes = require("./routes/images");
const librosRoutes = require("./routes/libros");

const pdfsRoutes = require("./routes/pdfs");
const cors = require("cors");






app.use(express.json());
app.use(cors());


app.use('/images', express.static('./images'))  //muestra file planos
app.use('/api/images', imagesRoutes)

app.use('/libros', express.static('./libros'))
app.use('/api/libros', librosRoutes)

app.use('/pdfs', express.static('./pdfs'))  //static text.txt
app.use('/api/pdfs', pdfsRoutes)




app.listen(port,()=>{
    console.log("server listening on port " + port);
})