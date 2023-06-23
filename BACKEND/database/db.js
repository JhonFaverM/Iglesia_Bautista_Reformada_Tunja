const mongoose = require("mongoose");
const db = mongoose.connect(process.env.MONGOSRV).then(()=>{
    console.log("Conectado a mongodb")
}).catch((err)=>{
    console.log("ocurrio un error: "+err)
})


module.exports = {
    db
}
