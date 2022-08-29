const dotenv = require("dotenv").config();
const express = require("express");
//const fileUpload = require('express-fileupload'); para crear file pdf
const app = express();
const port = process.env.PORT || 3000;
const db = require("./database/db");
const imagesRoutes = require("./routes/images");
const cors = require("cors");
//const pastorRoutes = require("./routes/pastor");



app.use(express.json());
app.use(cors());

/*
app.post('/mispdf', (req, res) => {
    res.send({data:'OK'})
}
*/
app.use('/images', express.static('./images'))
app.use('/api/images', imagesRoutes)

//app.use('/api/pastor', pastorRoutes)

app.listen(port,()=>{
    console.log("server listening on port " + port);
})