const Administradores = require("../models/Administrador")
//const { administradores } = require("../routes/administradores")



const listAdministradores = (req, res) => {
    Administradores.find((err, administradores) => {
        if(err) res.send(err)
        res.send(administradores)
    })
}

const login = (req, res)=>{
    //console.log("me llamaron")
    req.body.usuario && req.body.password ?
    Administradores.findOne({ usuario: req.body.usuario}, (err, user) => {
            console.log(user)
                switch(true){
                    case (err):
                        res.send({ "msg": err })
                        break;
                    case(user == null):
                        res.send({"msg":"No se encuentra el usuario"})
                        break;
                    case(user.password == req.body.password):
                        let token = user.generarJWT()
                        res.send({"msg":"Se puede loggear",token})
                        break;
                    case (user?.password != req.body.password):
                        res.send({ "msg": "La contraseña es erronea" })
                        break;
                                    
                }
                
            //}           
        
    })
    :
    res.send({"msg":"Te falta algun dato (usuario o contraseña)"});
}



module.exports = { login, listAdministradores}

/* 
const login = (req, res)=>{
    //console.log("me llamaron")
    req.body.usuario && req.body.password ?
    Administradores.findOne({ usuario: req.body.usuario}, (err, user) => {
            console.log(user)
                switch(true){
                    case (err):
                        res.send({ "msg": err })
                        break;
                    case(user==null):
                        res.send({"msg":"No se encuentra el usuario"})
                        break;
                    case(user.password == req.body.password):
                        let token = user.generarJWT()
                        res.send({"msg":"se puede loggear",token})
                        break;
                    case (user?.password != req.body.password):
                        res.send({ "msg": "La contraseña está erronea" })
                        break;
                                    
                }
                
            //}           
        
    })
    :
    res.send({"msg":"Te falta algun dato (usuario o contraseña)"});
}

*/